const mongoose = require('mongoose')
const Schema = mongoose.Schema

const breakSchema = new Schema(
    {
        workHourId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WorkHour',
            required: false,
        },
        startBreak: {
            type: String,
            required: false,
        },
        endBreak: {
            type: String,
            required: false,
        }
    }
)

module.exports = mongoose.model('Break', breakSchema)
