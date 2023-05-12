/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    countryName: {
        type: String,
        required: [true, 'Please add country name'],
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
    }
})

module.exports = mongoose.model('Country', CountrySchema);