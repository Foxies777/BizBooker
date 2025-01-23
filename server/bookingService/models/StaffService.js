const mongoose = require("mongoose");

const staffServiceSchema = new mongoose.Schema(
    {
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },
    },
    { timestamps: true }
);

staffServiceSchema.index({ staffId: 1, serviceId: 1 }, { unique: true });

module.exports = mongoose.model("StaffService", staffServiceSchema);
