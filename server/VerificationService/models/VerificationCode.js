const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verificationCodeSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        isUsed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("VerificationCode", verificationCodeSchema);
