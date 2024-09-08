// components/AddTodo.jsx

"use client";
import React, { useState } from 'react';
import { Button, Input } from 'pixel-retroui';
import { PlusCircle } from 'lucide-react';

const AddTodo = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [severity, setSeverity] = useState('low');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task, severity }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const newTodo = await response.json();
        onAdd(newTodo);
        setTask('');
        setSeverity('low');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center gap-3 p-10 m-8 font-minecraft">
      <Input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New task..."
        className="w-full p-3 mb-4 mr-2 border border-gray-300 rounded md:w-auto md:mb-0"
      />
      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        className="w-full p-5 mb-4 mr-5 text-black border border-gray-300 rounded md:w-auto md:mb-0 font-minecraft"
      >
        <option value="low">Mildly Important</option>
        <option value="medium">Quite Important</option>
        <option value="high">Very Important</option>
      </select>
      <Button type="submit" className="items-center w-48 p-2 m-2 text-white bg-blue-500 hover:bg-blue-600">
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Task
      </Button>
    </form>
  );
};

export default AddTodo;
