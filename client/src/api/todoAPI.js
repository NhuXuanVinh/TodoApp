import axios from './axios'

export const fetchTodos = async() => {
	const token = localStorage.getItem('token')
	try {
		const response = await axios.get('/todos/fetchtodos',
			{
				headers: {Authorization: `Bearer ${token}`}
			}
		);
		console.log(response.data)
		return response.data;
	  } catch (err) {
		throw new Error(err.response?.data?.msg || 'Error fetching todos');
	  }
}

export const createTodo = async(task) => {
	const token = localStorage.getItem('token')
	try {
		const response = await axios.post('/todos/createtodo',
			{task},
			{
				headers: {Authorization: `Bearer ${token}`}
			}
		);
		console.log(response.data)
		return response.data;
	  } catch (err) {
		throw new Error(err.response?.data?.msg || 'Error creating todo');
	  }
}

export const updateTodo = async(todo_id, newTask) => {
	const token = localStorage.getItem('token')
	try {
		const response = await axios.put(`/todos/updatetodo/${todo_id}`,
			{newTask},
			{
				headers: {Authorization: `Bearer ${token}`}
			}
		);
		console.log(response.data)
		return response.data;
	  } catch (err) {
		throw new Error(err.response?.data?.msg || 'Error creating todo');
	  }
}

export const deleteTodo = async(todo_id) => {
	const token = localStorage.getItem('token')
	try {
		const response = await axios.delete(`/todos/deletetodo/${todo_id}`,
			{
				headers: {Authorization: `Bearer ${token}`}
			}
		);
		console.log(response.data)
		return response.data;
	  } catch (err) {
		console.log(err)
		throw new Error(err.response?.data?.msg || 'Error creating todo');
	  }
}