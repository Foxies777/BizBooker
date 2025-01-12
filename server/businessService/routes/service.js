const express = require('express')
const { createService, getServicesByBusinessId } = require('../controllers/serviceController')
const {addServicesToStaff, getStaffServices} = require('../controllers/staffServiceController')
const router = express.Router()

router.post('/create', createService)
router.get('/:id', getServicesByBusinessId)
router.post("/add", addServicesToStaff);
router.get("/staff-service/:staffId", getStaffServices);
module.exports = router