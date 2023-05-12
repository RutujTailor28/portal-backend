/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    permissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Permission'}],
    createdDate: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Role', RoleSchema);