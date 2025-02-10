const StaffBusiness = require("../models/StaffBusiness");
const StaffService = require("../models/StaffService");
const StaffScheduleBusiness = require("../models/staffScheduleBusiness");
const Business = require("../models/Business");
const User = require("../models/User");
const Service = require("../models/Service");
const WorkHour = require("../models/WorkHour");
const Break = require("../models/Break");
const Shedules = require("../models/Shedules");
const Booking = require("../models/Booking");
const dayjs = require("dayjs");
const getStaffBusinesses = async (req, res) => {
    const { id } = req.params;
    try {
        const staff = await User.findOne({ _id: id });

        const businesses = await StaffBusiness.find({ staffId: id }).populate(
            "businessId",
            "name"
        );

        res.status(200).json(businesses);
    } catch (error) {
        console.error("Ошибка при получении бизнесов для сотрудника", error);
        res.status(500).send({ message: "Ошибка сервера" });
    }
};

const getStaffDetailsByBusiness = async (req, res) => {
    const { businessId, staffId } = req.params;
    console.log(businessId, staffId);
    
    
    try {
        // Проверка существования связи между сотрудником и бизнесом
        const staffBusiness = await StaffBusiness.findOne({
            businessId,
            staffId,
        }).populate("businessId", "name");
        console.log(staffBusiness);
        
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

const getAllStaffBusinessBookings = async (req, res) => {
    const { staffId, businessId } = req.params;

    try {
        // Находим записи с использованием populate для получения связанных данных
        const staffBookings = await Booking.find({ staffId, businessId })
            .populate("serviceId", "name duration price") // Подтягиваем данные об услуге
            .populate("userId", "name surname") // Подтягиваем данные о клиенте
            .lean();
        
        if (!staffBookings.length) {
            return res.status(404).json({
                message: "Записи для данного сотрудника и бизнеса не найдены.",
            });
        }

        // Форматируем данные
        const formattedBookings = staffBookings.map((booking) => ({
            _id: booking._id,
            serviceName: booking.serviceId.name,
            serviceDuration: booking.serviceId.duration,
            servicePrice: booking.serviceId.price,
            date: new Date(booking.startTime).toLocaleDateString("ru-RU"),
            startTime: new Date(booking.startTime).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            endTime: new Date(booking.endTime).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            clientName: `${booking.userId.surname} ${booking.userId.name}`,
            status: translateStatus(booking.status), // Перевод статуса
        }));

        res.status(200).json(formattedBookings);
    } catch (error) {
        console.error("Ошибка при получении записей сотрудника:", error);
        res.status(500).json({ message: "Не удалось получить записи сотрудника." });
    }
};

// Функция перевода статусов
const translateStatus = (status) => {
    const statusMap = {
        pending: "Ожидает",
        confirmed: "Подтверждено",
        completed: "Завершено",
        canceled: "Отменено",
    };
    return statusMap[status] || "Неизвестный статус";
};


const updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    try {
        // Проверяем, существует ли запись
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Запись не найдена" });
        }

        // Проверяем, является ли переданный статус допустимым
        const allowedStatuses = ["pending", "confirmed", "completed", "canceled"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Недопустимый статус" });
        }

        // Обновляем статус
        booking.status = status;
        await booking.save();

        res.status(200).json({ message: "Статус записи обновлён", booking });
    } catch (error) {
        console.error("Ошибка при обновлении статуса записи:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

const getStaffEarnings = async (req, res) => {
    try {
        const { businessId, staffId } = req.params;
        const { date } = req.query; // Ожидаем дату в формате YYYY-MM-DD
        if (!date) {
            return res.status(400).json({ message: "Дата обязательна" });
        }

        const selectedDate = dayjs(date);
        const startOfMonth = selectedDate.startOf("month").toDate();
        const endOfMonth = selectedDate.endOf("month").toDate();
        const startOfDay = selectedDate.startOf("day").toDate();
        const endOfDay = selectedDate.endOf("day").toDate();

        // Фильтруем записи только с подтвержденным статусом (клиент пришел)
        const filter = {
            businessId,
            staffId,
            status: "completed", // Учитываем только успешные визиты
        };
            

        // Заработок за день
        const dailyBookings = await Booking.find({
            ...filter,
            startTime: { $gte: startOfDay, $lte: endOfDay },
        })
        .populate("serviceId", "price") // Загружаем цену услуги
        .lean();

        // Подсчёт дневного заработка
        const dailyEarnings = dailyBookings.reduce((sum, booking) => {
            const price = booking.serviceId?.price ? parseFloat(booking.serviceId.price.toString()) : 0;
            return sum + price;
        }, 0);

        // Заработок за месяц
        const monthlyBookings = await Booking.find({
            ...filter,
            startTime: { $gte: startOfMonth, $lte: endOfMonth },
        })
        .populate("serviceId", "price") // Загружаем цену услуги
        .lean();

        const monthlyEarnings = monthlyBookings.reduce((sum, booking) => {
            const price = booking.serviceId?.price ? parseFloat(booking.serviceId.price.toString()) : 0;
            return sum + price;
        }, 0);
        return res.status(200).json({
            dailyEarnings,
            monthlyEarnings,
        });
    } catch (error) {
        console.error("Ошибка при получении заработка сотрудника:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};


module.exports = {
    getAllStaffBusinessBookings,
    getStaffBusinesses,
    getStaffDetailsByBusiness,
    updateBookingStatus,
    getStaffEarnings,
};
