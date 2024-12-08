const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workHourSchema = new Schema(
    {
        scheduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Schedule',
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('WorkHour', workHourSchema)
