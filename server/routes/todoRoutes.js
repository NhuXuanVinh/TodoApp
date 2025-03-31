// routes/todoRoutes.js

const express = require('express');
const todoController = require('../controllers/todoController'); // Import controller functions
const authMiddleware = require('../middlewares/authMiddleware'); // Authentication middleware

const router = express.Router();

// Protect all the routes with the verifyToken middleware
router.use(authMiddleware.verifyToken);

// CRUD routes for todos
router.get('/fetchtodos', todoController.getTodos);    // Get all todos for the authenticated user
router.post('/createtodo', todoController.createTodo); // Create a todo
router.put('/updatetodo/:todo_id', todoController.updateTodo);  // Update a specific todo
router.delete('/deletetodo/:todo_id', todoController.deleteTodo); // Delete a specific todo

module.exports = router;
