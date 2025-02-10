const express = require('express')
const router = express.Router()
const {  getStaffBusinesses, getStaffDetailsByBusiness, getAllStaffBusinessBookings, updateBookingStatus, getStaffEarnings } = require('../controllers/StaffController')

router.get("/getBusinesses/:id", getStaffBusinesses)
router.get("/:businessId/staff/:staffId/details", getStaffDetailsByBusiness);
router.get("/:businessId/staff/:staffId/bookings", getAllStaffBusinessBookings)
router.put("/bookings/:bookingId/status", updateBookingStatus);
router.get("/:businessId/staff/:staffId/earnings", getStaffEarnings)
module.exports = router