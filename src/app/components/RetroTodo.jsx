"use client";
import React, { useState, useEffect } from 'react';
import { Card, ProgressBar } from 'pixel-retroui';
import { AnimatePresence } from 'framer-motion';
import TodoItem from '@/app/components/TodoItems';
import AddTodo from '@/app/components/AddTodo';
import Pomodoro from '@/app/components/Pomodoro';

const ProfessionalTodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, completed: true }),
      });
      if (!response.ok) {
        throw new Error('Failed to complete todo');
      }
      const updatedTodo = await response.json();
      setTodos(todos.map(todo =>
        todo._id === id ? { ...todo, completed: true } : todo
      ));
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      setTodos(todos.filter(todo => todo._id !== id));
      console.log('Deleted todo:', id);  2
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completedTodos = todos.filter(todo => todo.completed).length;
  const progress = (completedTodos / todos.length) * 100 || 0;

  return (
    <div className="min-h-screen p-8 bg-gray-800">
      <h1 className="mb-8 text-4xl font-bold text-center text-sky-400 font-minecraft">Done-o-Matic</h1>
      <h3 className='mb-6 text-center text-green-500 font-minecraft text-md'>WTFF DUE IS NOWWW!!!</h3>
      <Pomodoro />
      <Card className="p-4 mb-8 bg-yellow-100 rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-semibold">Progress Overview</h2>
        <ProgressBar percent={progress} progress={progress} size='md' color='green' className="w-full h-6 overflow-hidden">
          <div
            className="h-full bg-red-500"
            style={{ width: `${progress}%` }}
          />
        </ProgressBar>
        <p className="mt-2 font-semibold text-center">{`${Math.round(progress)}% Completed`}</p>
      </Card>
      <AddTodo onAdd={addTodo} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence>
          {todos.filter(todo => !todo.completed).map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onComplete={completeTodo}
              onDelete={deleteTodo}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfessionalTodoList;