const mongoose = require("mongoose")
const Schema = mongoose.Schema

const staffSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            unique: true,
        },
        services:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
        }],
        businessId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        }]
    },
    { timestamps: true }
)

module.exports = mongoose.model("Staff", staffSchema)
