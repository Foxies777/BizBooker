// routes/business.js
const express = require("express");
const router = express.Router();
const {
    createBusiness,
    getBusiness,
    getAllBusinesses,
} = require("../controllers/businessController");

router.post("/create", createBusiness);
router.get("/:id", getBusiness);
router.get("/", getAllBusinesses);
module.exports = router;
