// models/Business.js
const mongoose = require("mongoose")

const businessSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        staffId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Staff",
            },
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model("Business", businessSchema)
