/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    permissionName: {
        type: String,
        required: true,
        unique: true,
        // match: [/^\S*$/, 'Please add valid permission name without space'],
        match: [/(^\S*(create|insert|update|change|remove|delete|view|list|fetch|get|retrieve)_[a-z])/g,
            'Please add valid permission name without space and must contain underscore with word. first word must be one of this: create,insert,update,change,remove,delete,view,list,fetch,get,retrieve'],
    },
    permissionDisplayName: {
        type: String,
        required: true,
        unique: true,
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

module.exports = mongoose.model('Permission', PermissionSchema);