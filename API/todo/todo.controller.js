/**
 * @module todoController
 */
'use strict';
const path = require('path');
const { asyncHandler } = require('../../middleware');
const { Schemas } = require('../../Database');
const { Todo } = Schemas;
const { advanceSearch, ErrorResponse } = require('../../utils');

/**
 * @method getTodos
 * @description   Get all Todos
 * @route  GET /todo
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return all todos
 * @example
 *       getTodos(req, res, next)
 */
exports.getTodos = asyncHandler(async (req, res, next) => {
  // use of advanceSearch Utils
  /*const searchResult = await advanceSearch(req.query, Todo, false, {
    user: req.user.id,
  });*/

  res.status(200).json(res.advancedResults);
});

/**
 * @method getTodoById
 * @description   Get Todo by id
 * @route  GET /todo/:todo_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return Todo object
 * @example
 *       getTodoById(req, res, next)
 */
exports.getTodoById = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.todo_id);

  if (!todo) {
    return next(
      new ErrorResponse(
        `Todo is not found with id of ${req.params.todo_id}`,
        404
      )
    );
  }

  if (todo.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this todo`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: todo });
});

/**
 * @method createTodo
 * @description   Create Todo
 * @route  POST /todo
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return created todo object
 * @example
 *       createTodo(req, res, next)
 */
exports.createTodo = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const todo = await Todo.create(req.body);

  res.status(201).json({ success: true, data: todo });
});

/**
 * @method updateTodo
 * @description   Update Todo
 * @route  PUT /todo/:todo_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return updated todo object
 * @example
 *       updateTodo(req, res, next)
 */
exports.updateTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.todo_id);

  if (!todo) {
    return next(
      new ErrorResponse(
        `Todo is not found with id of ${req.params.todo_id}`,
        404
      )
    );
  }

  if (todo.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this todo`,
        401
      )
    );
  }

  const { todo_text, is_completed } = req.body;

  todo.todo = todo_text;
  todo.is_completed = is_completed;

  await todo.save();

  res.status(200).json({ success: true, data: todo });
});

/**
 * @method  deleteTodo
 * @description   delete Todos
 * @route  DELETE /todo/:todo_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return empty object
 * @example
 *       deleteTodo(req, res, next)
 */
exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.todo_id);

  if (!todo) {
    return next(
      new ErrorResponse(
        `Todo is not found with id of ${req.params.todo_id}`,
        404
      )
    );
  }

  if (todo.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this todo`,
        401
      )
    );
  }

  await todo.remove();

  res.status(200).json({ success: true, data: {} });
});

/**
 * @method todoPhotoUpload
 * @description   Upload Todo photo by id
 * @route  PUT /todo/:todo_id/photo
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return Todo object
 * @example
 *       todoPhotoUpload(req, res, next)
 */
exports.todoPhotoUpload = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.todo_id);

  if (!todo) {
    return next(
      new ErrorResponse(
        `Todo is not found with id of ${req.params.todo_id}`,
        404
      )
    );
  }

  if (todo.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this todo`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check file size
  if (!file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.name = `photo_${todo._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Todo.findByIdAndUpdate(req.params.todo_id, { photo: file.name });

    return res.status(200).json({ success: true, data: file.name });
  });
});
