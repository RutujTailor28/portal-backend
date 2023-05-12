/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    carName: {
        type: String,
        required: [true, 'Please add car name'],
    },
    carNumber: {
        type: String,
        required: [true, 'Please add car number'],
    },
    carColor: {
        type: String,
        required: [true, 'Please add car color'],
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Car', CarSchema);