const { default: mongoose } = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: false,
        },
        duration: {
            type: String,
            required: true
        },
        price: {
            type: String,
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
module.exports = mongoose.model('Service', serviceSchema);