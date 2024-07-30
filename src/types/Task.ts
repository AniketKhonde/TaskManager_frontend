// src/types/Task.ts
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'To-Do' | 'In Progress' | 'Done';
}