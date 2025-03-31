const pool = require('../config/db')

const getTodos = async (user_id) =>{
	const result = await pool.query(
		'SELECT * FROM todos where user_id =  $1 ORDER BY created_at ASC',
		[user_id]
	);
	return result.rows || null;
}


const createTodo = async (user_id, task) =>{
	const result = await pool.query(
		'INSERT INTO todos (user_id, task) VALUES ($1, $2) RETURNING *',
		[user_id, task]
	);
	return result.rows[0]
}

const updateTodo = async (todo_id, newTask) =>{
	const result = await pool.query(
		'UPDATE todos SET task = $1 WHERE todo_id = $2',
		[newTask, todo_id]
	)
	return result.rows[0]
}


const deleteTodo = async (todo_id) =>{
	await pool.query(
		'DELETE FROM todos WHERE todo_id = $1',
		[todo_id]
	)
}


const getTodoByTask = async (text) =>{
	const result = await pool.query(
		'SELECT * FROM todos WHERE task LIKE $1',
		[`${text}%`]
	)
	return result.rows || null
}

module.exports = {
	getTodos, createTodo, updateTodo, deleteTodo, getTodoByTask
}