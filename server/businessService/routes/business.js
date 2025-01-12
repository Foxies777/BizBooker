// routes/business.js
const express = require("express")
const router = express.Router()
const {
    createBusiness,
    getBusiness,
    getAllBusinesses,
    updateBusiness,
    getBusinessStaff,
} = require("../controllers/businessController")

router.post("/create", createBusiness)

router.get("/:id", getBusiness)
router.get("/", getAllBusinesses)
router.get("/:id/staffs", getBusinessStaff)

router.put("/:id", updateBusiness)

module.exports = router
