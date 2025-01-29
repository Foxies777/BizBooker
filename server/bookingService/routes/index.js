const express = require("express");
const bookingFromServiceRouter = require("./bookingFromServicesRouter");
// const bookingFromStaffRouter = require("./bookingFromStaffRouter");
// const bookingFromDateTimeRouter = require("./bookingFromDateTimeRouter");
const { createBooking } = require("../controllers/bookingFromServicesController");

const router = express.Router();


router.use("/booking-from-service", bookingFromServiceRouter);
// router.use("/booking-from-staff", bookingFromStaffRouter);
// router.use("/booking-from-datetime", bookingFromDateTimeRouter);

router.post("/", createBooking);

module.exports = router;
