const express = require('express')
const router = express.Router()
const {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    assignScheduleToStaff
} = require('../controllers/scheduleController')

router.post('/create', createSchedule)
router.get('/', getAllSchedules)
router.get('/:id', getScheduleById)
router.post('/assign', assignScheduleToStaff)

module.exports = router