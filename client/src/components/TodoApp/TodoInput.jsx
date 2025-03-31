import React, { useState } from 'react';
import { Input, Button } from 'antd'; 
import {PlusOutlined} from '@ant-design/icons'
const TodoInput = ({ onCreate }) => {
  const [task, setTask] = useState('');

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task) {
      onCreate(task);
      setTask('');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <Input
        style={{ width: '50%' }}
        value={task}
        onChange={handleInputChange}
        placeholder="Enter new task"
      />
      <Button
        type="primary"
        icon = {<PlusOutlined/>}
        style={{ marginLeft: '10px' }}
        onClick={handleAddTask}
      >
        Add Task
      </Button>
    </div>
  );
};

export default TodoInput;
