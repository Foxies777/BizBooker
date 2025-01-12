const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        surname: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        patronymic: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["client", "staff", "business", "admin"],
            default: "client",
            required: true,
        },
        businessId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: false,
        }],
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
