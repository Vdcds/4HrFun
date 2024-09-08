"use client";
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onComplete, onDelete }) => {
  return (
    <AnimatePresence>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </AnimatePresence>
  );
};

export default TodoList;