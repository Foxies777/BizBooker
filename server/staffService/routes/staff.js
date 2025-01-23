const express = require('express')
const router = express.Router()
const {  getStaffBusinesses, getStaffDetailsByBusiness } = require('../controllers/StaffController')

router.get("/getBusinesses/:id", getStaffBusinesses)
router.get("/:businessId/staff/:staffId/details", getStaffDetailsByBusiness);
module.exports = router