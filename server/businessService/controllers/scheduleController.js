const Schedule = require('../models/Shedules');
const WorkHour = require('../models/WorkHour');
const Break = require('../models/Break');
const User = require('../models/User');
const StaffScheduleBusiness = require('../models/StaffScheduleBusiness');

// Добавление расписания для сотрудника в рамках бизнеса
const addScheduleForStaff = async (req, res) => {
    console.log('hi!!!');
    
    try {
        const { staffId, scheduleType, startDate, endDate, daysOff, workHours,breaks, businessId } = req.body;
        console.log(req.body);
        
        // Проверка существования пользователя с ролью staff
        const staff = await User.findById(staffId);
        if (!staff || staff.role !== 'staff') {
            return res.status(404).send({ message: 'Сотрудник не найден.' });
        }

        // Создание расписания
        const schedule = new Schedule({
            scheduleType,
            startDate,
            endDate,
            daysOff,
        });
        await schedule.save();

        // Создание записи в StaffScheduleBusiness
        const staffScheduleBusiness = new StaffScheduleBusiness({
            staffId,
            scheduleId: schedule._id,
            businessId,
        });
        await staffScheduleBusiness.save();
        console.log('Работает');

        // Добавление рабочего времени
        if (workHours) {
            const { startTime, endTime } = workHours;
            console.log('343434', startTime, endTime, breaks);
            
            // Создание рабочего времени
            const createdWorkHour = new WorkHour({
                scheduleId: schedule._id,
                startTime,
                endTime,
            });
            await createdWorkHour.save();

            // Добавление перерывов
            if (breaks && Array.isArray(breaks) && breaks.length > 0) {
                for (const breakPeriod of breaks) {
                    const { startBreak, endBreak } = breakPeriod;

                    const createdBreak = new Break({
                        workHourId: createdWorkHour._id,
                        startBreak,
                        endBreak,
                    });
                    console.log('12121212', createdBreak);
                    
                    await createdBreak.save();
                }
            }
        } else {
            console.error('workHours не переданы');
            return res.status(400).send({ message: 'Необходимо указать рабочее время.' });
        }
        
        console.log('Работает!!!');
        res.status(201).send({
            message: 'Расписание успешно добавлено.',
            schedule,
            staffScheduleBusiness,
        });
    } catch (error) {
        console.error('Ошибка при добавлении расписания:', error);
        res.status(500).send({ message: 'Ошибка сервера.' });
    }
};


// Получение расписания сотрудника в бизнесе
const getStaffSchedulesByBusiness = async (req, res) => {
    try {
        const { businessId, staffId } = req.params;

        // Проверка существования связи между бизнесом и сотрудником
        const staffSchedule = await StaffScheduleBusiness.findOne({
            staffId,
            businessId,
        }).populate('scheduleId');

        if (!staffSchedule) {
            return res.status(404).send({ message: 'Расписание для сотрудника в данном бизнесе не найдено.' });
        }

        const schedule = staffSchedule.scheduleId;
        console.log(schedule);

        // Найти только один рабочий час, связанный с расписанием
        const workHour = await WorkHour.findOne({ scheduleId: schedule._id }).lean();
        console.log(workHour);

        if (workHour) {
            // Найти перерывы, связанные с этим рабочим часом
            const breaks = await Break.find({ workHourId: workHour._id }).lean();
            workHour.breaks = breaks;
        }

        console.log('Work hour with breaks:', workHour);

        res.status(200).send([{
            ...schedule.toObject(),
            workHours: workHour,
        }]);
    } catch (error) {
        console.error('Ошибка при получении расписания сотрудника:', error);
        res.status(500).send({ message: 'Ошибка сервера.' });
    }
};


// Получение всех расписаний в бизнесе
const getBusinessStaffSchedules = async (req, res) => {
    try {
        const { businessId } = req.params;

        const staffSchedules = await StaffScheduleBusiness.find({
            businessId,
        })
            .populate('staffId', 'name email phone')
            .populate('scheduleId');

        const result = staffSchedules.map((relation) => ({
            staff: relation.staffId,
            schedule: relation.scheduleId,
        }));

        res.status(200).send({
            message: 'Все расписания сотрудников успешно получены.',
            staffSchedules: result,
        });
    } catch (error) {
        console.error('Ошибка при получении расписаний бизнеса:', error);
        res.status(500).send({ message: 'Ошибка сервера.' });
    }
};

module.exports = {
    addScheduleForStaff,
    getStaffSchedulesByBusiness,
    getBusinessStaffSchedules,
};
