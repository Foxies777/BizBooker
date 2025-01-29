const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Обратите внимание, что "User" используется как для клиентов, так и для сотрудников
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: false,
    },
  },
  {
    timestamps: true, // Добавляет createdAt и updatedAt поля автоматически
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
