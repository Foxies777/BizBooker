const Schedule = require('../models/Shedules')
const WorkHour = require('../models/WorkHour')
const Break = require('../models/Break')
const StaffScheduleBusiness = require('../models/staffScheduleBusiness')

// Создание расписания, рабочих часов и перерывов
const createSchedule = async (req, res) => {
    const { scheduleType, startDate, endDate, daysOff, workHours, breaks, staffId, businessId } = req.body
    console.log(req.body)

    try {
        // Создание расписания
        const newSchedule = new Schedule({ scheduleType, startDate, endDate, daysOff })
        const savedSchedule = await newSchedule.save()

        // Создание рабочего времени
        const newWorkHour = new WorkHour({
            scheduleId: savedSchedule._id,
            startTime: workHours.startTime,
            endTime: workHours.endTime
        })
        const savedWorkHour = await newWorkHour.save()

        // Создание перерывов
        const breakPromises = breaks.map(br => {
            const newBreak = new Break({
                workHourId: savedWorkHour._id,
                startBreak: br.startBreak,
                endBreak: br.endBreak
            })
            return newBreak.save()
        })

        await Promise.all(breakPromises)

        // Создание записи о расписании сотрудника и бизнеса
        const staffScheduleBusiness = new StaffScheduleBusiness({
            staffId,
            scheduleId: savedSchedule._id,
            businessId
        })
        const savedStaffScheduleBusiness = await staffScheduleBusiness.save()

        res.status(201).json({
            schedule: savedSchedule,
            workHours: savedWorkHour,
            staffScheduleBusiness: savedStaffScheduleBusiness
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message })
    }
}

// Получение всех расписаний
const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find()
        res.status(200).json(schedules)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Получение расписания по ID
const getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id)
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' })
        }
        res.status(200).json(schedule)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Связывание сотрудника с расписанием и бизнесом
const assignScheduleToStaff = async (req, res) => {
    const { staffId, scheduleId, businessId } = req.body
    try {
        const staffScheduleBusiness = new StaffScheduleBusiness({ staffId, scheduleId, businessId })
        const savedStaffScheduleBusiness = await staffScheduleBusiness.save()
        res.status(201).json(savedStaffScheduleBusiness)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports ={
    createSchedule,
    getAllSchedules,
    getScheduleById,
    assignScheduleToStaff,
}