const express = require('express')
const router = express.Router()
const {  getStaffBusinesses, getStaffDetailsByBusiness, getAllStaffBusinessBookings } = require('../controllers/StaffController')

router.get("/getBusinesses/:id", getStaffBusinesses)
router.get("/:businessId/staff/:staffId/details", getStaffDetailsByBusiness);
router.get("/:businessId/staff/:staffId/bookings", getAllStaffBusinessBookings)
module.exports = router