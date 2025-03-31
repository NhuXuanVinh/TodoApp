import React, { useState } from 'react';
import { List, Input, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'; 

const TodoItem = ({ todo, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleEditChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleEdit = () => {
    onEdit(todo.todo_id, editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(todo.task); // Reset to the original task
  };

  return (
    <List.Item
      actions={[
        isEditing ? (
          <Space>
            <Button 
              type="primary" 
              icon={<CheckOutlined />} 
              onClick={handleEdit} 
            >
              Confirm
            </Button>
            <Button 
              icon={<CloseOutlined />} 
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <Button 
              icon={<EditOutlined />} 
              onClick={() => setIsEditing(true)} 
              type="default"
            >
              Edit
            </Button>
            <Button 
              icon={<DeleteOutlined />} 
              onClick={() => onDelete(todo.todo_id)} 
              type="primary"
              danger
            >
              Delete
            </Button>
          </Space>
        ),
      ]}
    >
      {isEditing ? (
        <Input
          value={editedTask}
          onChange={handleEditChange}
          autoFocus
          style={{ width: '80%' }}
        />
      ) : (
        <span>{todo.task}</span>
      )}
    </List.Item>
  );
};

export default TodoItem;
