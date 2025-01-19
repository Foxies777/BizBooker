const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema(
    {
        scheduleType: {
            type: String,
            enum: ['temporary', 'permanent', 'recurring'],
            required: true
        },
        startDate: {
            type: Date,
            required: false
        },
        endDate: {
            type: Date,
            required: false
        },
        daysOff: {
            type: [String],
            required: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Schedule', scheduleSchema)
