// src/components/TaskItem.tsx
import React from 'react';
import { Task } from '../types/Task';
import { text } from 'stream/consumers';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <button onClick={() => onEdit(task)} className='button'>Edit</button>
      <button onClick={() => onDelete(task._id)} className='button'>Delete</button>
    </div>
  );
};

export default TaskItem;
