/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: [true, 'Please add city name'],
        index: true,
        unique: true
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: [true, 'Please add state']
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

module.exports = mongoose.model('City', CitySchema);