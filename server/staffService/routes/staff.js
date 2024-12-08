const express = require('express')
const router = express.Router()
const { addStaff, getStaff } = require('../controllers/StaffController')

router.post("/addStaff", addStaff)
router.get("/:id", getStaff)

module.exports = router