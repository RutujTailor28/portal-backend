/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');

const UserFCMTokenSchema = new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserDevice',
        required: [true, 'Please add device'],
    },
    fcmToken: {
        type: String,
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

module.exports = mongoose.model('UserFCMToken', UserFCMTokenSchema);