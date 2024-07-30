import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Task } from '../types/Task';
import '../App.css'

interface TaskFormProps {
  onTaskAdded: () => void; // Prop to refresh task list after adding a task
  editingTask: Task | null; // Prop for the task being edited
  onEditComplete: () => void; // Prop to signal that editing is complete
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded, editingTask, onEditComplete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'To-Do' | 'In Progress' | 'Done'>('To-Do');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(`https://task-manger-backend-lac.vercel.app/tasks/${editingTask._id}`, { title, description, status });
      } else {
        await axios.post('https://task-manger-backend-lac.vercel.app/tasks', { title, description, status });
      }
      setTitle('');
      setDescription('');
      setStatus('To-Do');
      onTaskAdded(); // Call the callback to refresh the task list
      onEditComplete(); // Clear the editing task state
    } catch (error) {
      console.error('Error saving task', error);
    }
  };

  return (
    <div className='TaskForm'>
    <form onSubmit={handleSubmit} className='Form'>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as 'To-Do' | 'In Progress' | 'Done')}>
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" className='button'>{editingTask ? 'Update Task' : 'Add Task'}</button>
    </form>
    </div>
  );
};

export default TaskForm;
