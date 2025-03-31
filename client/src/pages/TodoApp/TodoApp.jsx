import React, { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../../api/todoAPI';
import TodoInput from '../../components/TodoApp/TodoInput';
import TodoList from '../../components/TodoApp/TodoList';
import { Layout, message, Spin } from 'antd'; 
const { Header, Content } = Layout;

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch todos from the API
  const loadTodos = async () => {
    setLoading(true);
    try {
      const todoList = await fetchTodos();
      setTodos(todoList);
    } catch (error) {
      message.error('Error fetching todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleCreateTodo = async (task) => {
    try {
      await createTodo(task);
      message.success('Task added successfully!');
      loadTodos();
    } catch (error) {
      message.error('Error adding task');
    }
  };

  const handleUpdateTodo = async (todo_id, newTask) => {
    try {
      await updateTodo(todo_id, newTask);
      message.success('Task updated successfully!');
      loadTodos();
    } catch (error) {
      message.error('Error updating task');
    }
  };

  const handleDeleteTodo = async (todo_id) => {
    try {
      await deleteTodo(todo_id);
      message.success('Task deleted successfully!');
      loadTodos();
    } catch (error) {
      message.error('Error deleting task');
    }
  };

  return (
    <Layout>
      <Header style={{ background: '#1DA57A', color: '#fff', textAlign: 'center' }}>
        <h1>Todo App</h1>
      </Header>
      <Content style={{ padding: '20px', background: '#f4f4f4' }}>
        <Spin spinning={loading} tip="Loading todos...">
          <div style={{ marginBottom: '20px' }}>
            <TodoInput onCreate={handleCreateTodo} />
          </div>

          <TodoList
            todos={todos}
            onEdit={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        </Spin>
      </Content>
    </Layout>
  );
};

export default TodoApp;
