const express = require('express')
const { createService, getServicesByBusinessId, updateService, deleteService } = require('../controllers/serviceController')
const {addServicesToStaff, getStaffServices, updateServicesForStaff} = require('../controllers/staffServiceController')
const router = express.Router()

router.post('/create', createService)
router.get('/:id', getServicesByBusinessId)
router.post("/add", addServicesToStaff);
router.put("/staff-service/update", updateServicesForStaff);
router.put("/:serviceId", updateService);
router.delete("/:serviceId", deleteService);


router.get("/staff-service/:staffId", getStaffServices);
module.exports = router