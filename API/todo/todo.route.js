'use strict';
const express = require('express');
const router = express.Router();

const {
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  createTodo,
  todoPhotoUpload,
} = require('./todo.controller');

const { Schemas } = require('../../Database');
const { Todo } = Schemas;

const { advancedResults, auth } = require('../../middleware');
const { protect, authorize } = auth;

router.use(protect);
router.use(authorize(['user', 'admin']));

router.route('/').get(advancedResults(Todo), getTodos).post(createTodo);

router.route('/:todo_id/photo').put(todoPhotoUpload);

router.route('/:todo_id')
    .get(getTodoById)
    .put(updateTodo)
    .delete(deleteTodo);

module.exports = router;
