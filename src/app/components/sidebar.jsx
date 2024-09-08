"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Input } from 'pixel-retroui';
import { Menu, X, PlusCircle, BarChart2, Calendar, Settings } from 'lucide-react';
import Link from 'next/link';

const Sidebar = ({ todos, onAddTodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickTask, setQuickTask] = useState('');

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (quickTask.trim()) {
      onAddTodo({ task: quickTask, severity: 'medium' });
      setQuickTask('');
    }
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <>
      <Button
        onClick={toggleSidebar}
        className="fixed z-50 p-2 text-white bg-blue-500 rounded-full top-4 left-4 hover:bg-blue-600"
      >
        <Menu className="w-6 h-6" />
      </Button>

      <motion.div
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 z-40 w-64 h-full p-4 bg-gray-800 shadow-lg"
      >
        <Button
          onClick={toggleSidebar}
          className="absolute p-2 text-white bg-red-500 rounded-full top-4 right-4 hover:bg-red-600"
        >
          <X className="w-6 h-6" />
        </Button>
        <Link href={"/"}>
        <h2 className="mt-16 mb-6 text-2xl font-bold text-white font-minecraft">Done-O-Matic</h2>
        </Link>
        <nav className="mb-6 text-white">
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard" className="flex items-center text-gray-300 hover:text-white">
                <BarChart2 className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/calender" className="flex items-center text-gray-300 hover:text-white">
                <Calendar className="w-5 h-5 mr-3" />
                <span>Calendar</span>
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center text-gray-300 hover:text-white">
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <Card className="p-4 mb-6 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Task Summary</h3>
          <p className="text-gray-300">Total Tasks: 15</p>
          <p className="text-gray-300">Completed: 10</p>
          <p className="text-gray-300">Pending: 5</p>
        </Card>

        <form onSubmit={handleQuickAdd} className="p-4 mt-auto mb-4">
          <Input
            type="text"
            value={quickTask}
            onChange={(e) => setQuickTask(e.target.value)}
            placeholder="Quick add task..."
            className="w-full p-2 mb-2 text-black rounded"
          />
          <Button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </form>
      </motion.div>
    </>
  );
};

export default Sidebar;
