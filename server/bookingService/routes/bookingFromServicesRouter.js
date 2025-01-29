const express = require("express");
const router = express.Router();
const {
    getServicesByBusiness,
    getSpecialistsByServiceAndBusiness,
    getAvailableDatesForServiceAndStaff,
} = require("../controllers/bookingFromServicesController");

// Роуты для бронирования
router.get("/services/:businessId", getServicesByBusiness);
router.get("/specialists/:serviceId/:businessId", getSpecialistsByServiceAndBusiness);
router.get("/available-dates", getAvailableDatesForServiceAndStaff);


module.exports = router;
