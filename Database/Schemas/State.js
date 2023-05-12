/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    stateName: {
        type: String,
        required: [true, 'Please add state name'],
        index: true,
        unique: true
    },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: [true, 'Please add country']
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

module.exports = mongoose.model('State', StateSchema);