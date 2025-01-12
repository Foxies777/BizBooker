const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invitationSchema = new Schema(
    {
        businessId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "declined"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Invitation", invitationSchema);
