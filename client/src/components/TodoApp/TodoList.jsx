import React from 'react';
import { List, Button, Space } from 'antd'; 
import TodoItem from './TodoItem';

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <List
      bordered
      dataSource={todos}
      renderItem={(todo) => (
        <TodoItem
          key={todo.todo_id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
};

export default TodoList;
