const todoModel = require('../models/todoModel')
const logger = require('../utils/logger')
const getTodos = async (req, res) =>{
	const user_id = req.user.user_id
	try {
		const todos = await todoModel.getTodos(user_id)
		logger.info(`User ID: ${user_id} - Fetched todos successfully`);
		res.status(200).json(todos)
	}catch(err){
		logger.error(`User ID: ${user_id} - Error fetching todos: ${err.message}`);
		res.status(500).json({msg: 'Error fetching todo'})
	}
}

const createTodo = async (req, res) => {
	const task = req.body.task
	const user_id = req.user.user_id
	if (!task) {
		return res.status(400).json({ msg: 'Task is required' });
	}

	try {
		const todo = await todoModel.createTodo(user_id, task)
		logger.info(`User ID: ${user_id} - Created new todo: ${task}`);
		res.status(200).json(todo)
	}catch(err){
		logger.error(`User ID: ${user_id} - Error creating todo: ${err.message}`);
		res.status(500).json({msg: 'Error creating todo'})
	}
}

const updateTodo = async (req, res) => {
	const newTask = req.body.newTask
	const todo_id = req.params.todo_id
	const user_id = req.user.user_id
	if (!newTask) {
		return res.status(400).json({ msg: 'New task is required' });
	}

	if (!todo_id) {
		return res.status(404).json({ msg: 'Missing ID' });
	}

	try {
		const updatedTodo = await todoModel.updateTodo(todo_id, newTask)
		logger.info(`User ID: ${user_id} - Updated todo ID: ${todo_id} with new task: ${newTask}`);
		res.status(200).json(updatedTodo)
	}catch(error){
		logger.error(`User ID: ${user_id} - Error updating todo ID: ${todo_id}: ${err.message}`);
		res.status(500).json({msg: 'Error updating todo'})
	}
}

const deleteTodo = async(req, res) =>{
	const todo_id = req.params.todo_id
	const user_id = req.user.user_id
	if (!todo_id) {
		return res.status(404).json({ msg: 'Missing ID' });
	}

	try {
		await todoModel.deleteTodo(todo_id)
		logger.info(`User ID: ${user_id} - Deleted todo ID: ${todo_id}`);
		res.status(200).json({msg:'Delete task successful'})
	}catch(error){
		logger.error(`User ID: ${user_id} - Error deleting todo ID: ${todo_id}: ${err.message}`);

		res.status(500).json({msg: 'Error delete todo'})
	}
}

module.exports = {
	getTodos, createTodo, updateTodo, deleteTodo
}