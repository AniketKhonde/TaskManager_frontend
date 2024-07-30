// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import '../App.css'
import axios from 'axios';
import { Task } from '../types/Task';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://task-manger-backend-lac.vercel.app/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://task-manger-backend-lac.vercel.app/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div>
      <h1 className='heading'>Task Management Application</h1>
      <TaskForm
        onTaskAdded={fetchTasks}
        editingTask={editingTask}
        onEditComplete={() => setEditingTask(null)}
      />
      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
