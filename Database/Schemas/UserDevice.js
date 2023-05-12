/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');

const UserDeviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please add user'],
    },
    deviceToken: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogout: {
      type: Date | null,
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

module.exports = mongoose.model('UserDevice', UserDeviceSchema);