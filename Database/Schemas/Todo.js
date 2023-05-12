/**
 * @module Database/Schemas
 */
const mongoose = require('mongoose');
const {Schema} = mongoose;
/**
 * A TodoSchema
 * @typedef {Object} TodoSchema
 * @property {string} todo - user name
 * @property {string} is_completed - user email
 * @property {string} user - user id reference from UserSchema
 * @property {date} createdAt - user todo created date
 */
const TodoSchema = new Schema({
  todo: {
    type: String,
    required: [true, 'Please add todo'],
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
