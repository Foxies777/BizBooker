const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffScheduleBusinessSchema = new Schema(
    {
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff',
            required: true
        },
        scheduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Schedule',
            required: true
        },
        businessId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('StaffScheduleBusiness', staffScheduleBusinessSchema)
