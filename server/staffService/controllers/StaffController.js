const StaffBusiness = require("../models/StaffBusiness")
const StaffService = require("../models/StaffService");
const StaffScheduleBusiness  = require("../models/staffScheduleBusiness")
const Business = require("../models/Business")
const User = require("../models/User")
const Service = require("../models/Service");
const WorkHour = require("../models/WorkHour");
const Break = require("../models/Break");
const Shedules = require("../models/Shedules");
const getStaffBusinesses = async(req, res) => {
    const {id} = req.params
    try {
        const staff = await User.findOne({_id: id})
        console.log(staff);
        
        const businesses = await StaffBusiness.find({staffId: id}).populate('businessId', "name")
        console.log(businesses);
            
        res.status(200).json(businesses)
    } catch (error) {
        console.error("Ошибка при получении бизнесов для сотрудника", error);
        res.status(500).send({message: "Ошибка сервера"})        
    }
}



const getStaffDetailsByBusiness = async (req, res) => {
    const { businessId, staffId } = req.params;

    try {
        // Проверка существования связи между сотрудником и бизнесом
        const staffBusiness = await StaffBusiness.findOne({
            businessId,
            staffId,
        }).populate("businessId", "name");

        if (!staffBusiness) {
            return res
                .status(404)
                .json({ message: "Сотрудник не привязан к данному бизнесу." });
        }

        // Получение расписания сотрудника
        const staffScheduleRelation = await StaffScheduleBusiness.findOne({
            businessId,
            staffId,
        }).populate("scheduleId");

        let schedule = null;
        let workHours = [];
        if (staffScheduleRelation) {
            schedule = staffScheduleRelation.scheduleId;
            if (schedule) {
                workHours = await WorkHour.find({
                    scheduleId: schedule._id,
                }).lean();

                for (const workHour of workHours) {
                    const breaks = await Break.find({
                        workHourId: workHour._id,
                    }).lean();
                    workHour.breaks = breaks;
                }
            }
        }

        // Получение услуг сотрудника в этом бизнесе
        const staffServices = await StaffService.find({ staffId })
            .populate({
                path: "serviceId",
                match: { businessId }, // Услуги только из текущего бизнеса
                select: "name description duration price", // Выбираем только нужные поля
            })
            .lean();

        const services = staffServices
            .filter((staffService) => staffService.serviceId) // Исключаем "пустые" услуги
            .map((staffService) => staffService.serviceId);

        // Формирование ответа
        res.status(200).json({
            business: staffBusiness.businessId,
            services,
            schedule: schedule
                ? {
                      ...schedule.toObject(),
                      workHours,
                  }
                : null, // Расписание (или null, если его нет)
        });
    } catch (error) {
        console.error("Ошибка при получении данных сотрудника:", error);
        res.status(500).json({ message: "Ошибка сервера." });
    }
};

module.exports ={
    getStaffBusinesses,
    getStaffDetailsByBusiness
}