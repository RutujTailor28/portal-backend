/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');

const CarWashSchema = new mongoose.Schema({
    superVisorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    cleanerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    customerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    carId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Car',
        required: true
    },
    washStatusId: {
        type: mongoose.Schema.ObjectId,
        ref: 'WashStatus',
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    washDate: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('CarWash', CarWashSchema);