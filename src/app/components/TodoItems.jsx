"use client";
import React from 'react';
import { Button, Card } from 'pixel-retroui';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const TodoItem = ({ todo, onComplete, onDelete }) => {
  const severityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const severityTexts = {
    low: 'Mildly Important',
    medium: 'Quite Important',
    high: 'Very Important',
  };

  const handleComplete = async () => {
    try {
      const response = await fetch(`/api/todos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: todo._id, completed: true }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedTodo = await response.json();
      onComplete(updatedTodo._id);
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/todos`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: todo._id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      onDelete(todo._id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      className="m-2"
    >
      <Card className={`p-4 w-full ${severityColors[todo.severity]} shadow-md rounded-lg`}>
        <h3 className="mb-2 text-lg font-semibold truncate">{todo.task}</h3>
        <p className="mb-4 text-sm">Priority: {severityTexts[todo.severity]}</p>
        <div className="flex justify-between mt-4">
          <Button onClick={handleComplete} className="text-white bg-green-500 hover:bg-green-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete
          </Button>
          <Button onClick={handleDelete} className="text-white bg-red-500 hover:bg-red-600">
            <XCircle className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default TodoItem;