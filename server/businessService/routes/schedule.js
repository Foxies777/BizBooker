const express = require('express');
const router = express.Router();
const {
    addScheduleForStaff,
    getStaffSchedulesByBusiness,
    getBusinessStaffSchedules,
} = require('../controllers/scheduleController');

// POST: Добавление расписания для сотрудника
router.post('/add', addScheduleForStaff);

// GET: Получение расписания конкретного сотрудника в бизнесе
router.get('/:businessId/staff/:staffId', getStaffSchedulesByBusiness);

// GET: Получение всех расписаний в бизнесе
router.get('/:businessId', getBusinessStaffSchedules);

module.exports = router;
