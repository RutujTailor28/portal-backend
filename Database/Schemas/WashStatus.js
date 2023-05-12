/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');

const WashStatusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add wash status name'],
        index: true,
        unique: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Number,
        default: 1
    },
})

module.exports = mongoose.model('WashStatus', WashStatusSchema);