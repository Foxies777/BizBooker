const Service = require("../models/Service");
const StaffService = require("../models/StaffService");
const StaffScheduleBusiness = require("../models/StaffScheduleBusiness");
const StaffBusiness = require("../models/StaffBusiness");
const User = require('../models/User');
const WorkHour = require("../models/WorkHour");
const Booking = require("../models/Booking");
const Schedule = require("../models/Shedules");
const Break = require("../models/Break");

// Получение списка услуг для конкретного бизнеса
const getServicesByBusiness = async (req, res) => {
    const { businessId } = req.params;

    try {
        const services = await Service.find({ businessId }).lean();
        if (!services.length) {
            return res
                .status(404)
                .json({ message: "Услуги не найдены для данного бизнеса." });
        }
        
        res.status(200).json(services);
    } catch (error) {
        console.error("Ошибка при получении услуг для бизнеса:", error);
        res.status(500).json({ message: "Ошибка сервера." });
    }
};

// Получение специалистов, предоставляющих услугу в указанном бизнесе
const getSpecialistsByServiceAndBusiness = async (req, res) => {
    const { serviceId, businessId } = req.params;

    try {
        // Получаем всех сотрудников, связанных с указанной услугой
        const staffServices = await StaffService.find({ serviceId }).lean();

        // Извлекаем уникальные `staffId` из данных StaffService
        const validStaffIds = staffServices.map((ss) => ss.staffId).filter(Boolean);

        if (!validStaffIds.length) {
            return res.status(404).json({
                message: "Нет сотрудников, связанных с указанной услугой.",
            });
        }

        // Проверяем, какие сотрудники связаны с данным бизнесом через StaffBusiness
        const staffBusinessRecords = await StaffBusiness.find({
            staffId: { $in: validStaffIds },
            businessId: businessId,
        }).lean();

        const businessStaffIds = staffBusinessRecords.map((sb) => sb.staffId);

        if (!businessStaffIds.length) {
            return res.status(404).json({
                message: "Нет сотрудников, связанных с данным бизнесом для этой услуги.",
            });
        }

        // Получаем данные сотрудников, связанных с бизнесом
        const populatedStaff = await User.find({
            _id: { $in: businessStaffIds },
        }).select("name role").lean();

        // Формируем список специалистов
        const specialists = populatedStaff.map((staff) => ({
            id: staff._id,
            name: staff.name,
            role: staff.role,
        }));


        if (!specialists.length) {
            return res.status(404).json({
                message: "Нет доступных специалистов для этой услуги в данном бизнесе.",
            });
        }

        res.status(200).json(specialists);
    } catch (error) {
        console.error("Ошибка при получении специалистов для бизнеса:", error);
        res.status(500).json({ message: "Ошибка сервера." });
    }
};




// Получение доступного времени для специалиста
const getAvailableDatesForServiceAndStaff = async (req, res) => {
    const { serviceId, staffId } = req.query; // Убираем serviceDuration из запроса, так как будем получать его из БД
    console.log(req.query);

    try {
        // Получаем длительность услуги из базы данных
        const service = await Service.findById(serviceId).lean();
        if (!service) {
            return res.status(404).json({ message: "Услуга не найдена" });
        }
        const serviceDuration = service.duration; // Предположим, что длительность хранится в поле `duration`
        console.log("Service Duration: ", serviceDuration);

        // Получаем расписания сотрудника
        const staffSchedules = await StaffScheduleBusiness.find({ staffId }).populate({
            path: "scheduleId",
            model: "Schedule",
        });

        if (!staffSchedules || staffSchedules.length === 0) {
            return res
                .status(404)
                .json({ message: "У сотрудника нет связанного расписания" });
        }

        const schedule = staffSchedules[0].scheduleId;
        console.log("Schedule: ", schedule);

        // Генерация всех дат в диапазоне расписания
        const workDates = generateDatesInRange(schedule.startDate, schedule.endDate, schedule.daysOff);
        console.log("Work Dates: ", workDates);

        // Получаем рабочие часы
        const workHours = await WorkHour.find({ scheduleId: schedule._id }).lean();
        console.log("Work Hours: ", workHours);

        if (!workHours || workHours.length === 0) {
            return res
                .status(404)
                .json({ message: "У сотрудника нет рабочих часов" });
        }

        // Получаем все записи сотрудника
        const existingBookings = await Booking.find({
            staffId,
            serviceId,
        }).lean();
        console.log("Existing Bookings: ", existingBookings);

        // Учет перерывов
        const breaks = await Break.find({
            workHourId: { $in: workHours.map((wh) => wh._id) },
        }).lean();
        console.log("Breaks: ", breaks);

        // Генерация доступных дат и времени
        const availableDates = workDates.map((date) => {
            const availableTimes = [];

            workHours.forEach((wh) => {
                let currentStart = parseTimeToDate(wh.startTime, date);
                const workEnd = parseTimeToDate(wh.endTime, date);

                while (currentStart < workEnd) {
                    const nextInterval = new Date(
                        currentStart.getTime() + serviceDuration * 60 * 1000
                    ); // Интервал в зависимости от длительности услуги

                    const isBooked = existingBookings.some(
                        (bt) =>
                            (currentStart >= new Date(bt.startTime) && currentStart < new Date(bt.endTime)) ||
                            (nextInterval > new Date(bt.startTime) && nextInterval <= new Date(bt.endTime)) ||
                            (currentStart <= new Date(bt.startTime) && nextInterval >= new Date(bt.endTime))
                    );

                    const isInBreak = breaks.some(
                        (br) =>
                            (currentStart >= parseTimeToDate(br.startBreak, date) && currentStart < parseTimeToDate(br.endBreak, date)) ||
                            (nextInterval > parseTimeToDate(br.startBreak, date) && nextInterval <= parseTimeToDate(br.endBreak, date)) ||
                            (currentStart <= parseTimeToDate(br.startBreak, date) && nextInterval >= parseTimeToDate(br.endBreak, date))
                    );

                    if (!isBooked && !isInBreak && nextInterval <= workEnd) {
                        availableTimes.push({ start: currentStart, end: nextInterval });
                    }

                    currentStart = new Date(currentStart.getTime() + 30 * 60 * 1000); // Переход на следующий интервал в 30 минут
                }
            });

            return {
                date: date.toISOString().split("T")[0],
                availableTimes,
            };
        });

        console.log("availableDates", availableDates);
        res.status(200).json(availableDates);
    } catch (error) {
        console.error("Ошибка при получении доступных дат:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

// Генерация всех дат в диапазоне
const generateDatesInRange = (startDate, endDate, daysOff) => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        const day = currentDate.toISOString().split("T")[0];

        if (!daysOff.includes(day)) {
            dates.push(new Date(currentDate));
        }

        currentDate.setDate(currentDate.getDate() + 1); // Переход на следующий день
    }

    return dates;
};

// Преобразование времени в дату
const parseTimeToDate = (time, date) => {
    const [hours, minutes] = time.split(":").map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
};


// Создание бронирования
const createBooking = async (req, res) => {
    const {
        userId,
        serviceId,
        staffId,
        businessId,
        startTime,
        endTime,
        price,
    } = req.body;

    try {
        // Проверка на пересечение с существующими бронированиями
        const existingBooking = await Booking.findOne({
            staffId,
            startTime: { $lte: endTime },
            endTime: { $gte: startTime },
        });

        if (existingBooking) {
            return res
                .status(400)
                .json({ message: "Выбранное время уже занято." });
        }

        // Создание нового бронирования
        const booking = new Booking({
            userId,
            serviceId,
            staffId,
            businessId,
            startTime,
            endTime,
            status: "pending",
            price,
        });

        await booking.save();

        res.status(201).json({
            message: "Бронирование успешно создано.",
            booking,
        });
    } catch (error) {
        console.error("Ошибка при создании бронирования:", error);
        res.status(500).json({ message: "Ошибка сервера." });
    }
};

module.exports = {
    getServicesByBusiness,
    getSpecialistsByServiceAndBusiness,
    getAvailableDatesForServiceAndStaff,
    createBooking,
};
