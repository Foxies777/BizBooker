// models/StaffBusiness.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffBusinessSchema = new Schema(
    {
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        businessId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("StaffBusiness", staffBusinessSchema);
