"use client";
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'pixel-retroui';
import { BarChart2, CheckCircle, Clock, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchWeeklyData();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchWeeklyData = async () => {
    try {
      const response = await fetch('/api/todos/weekly');
      if (!response.ok) {
        throw new Error('Failed to fetch weekly data');
      }
      const data = await response.json();
      setWeeklyData(data);
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, completed: !task.completed }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      setTasks(tasks.map(task =>
        task._id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const priorityTasks = tasks.filter(task => task.severity === 'high').length;

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold text-white font-minecraft">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 bg-blue-600 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Total Tasks</p>
              <h2 className="text-2xl font-bold text-white">{totalTasks}</h2>
            </div>
            <BarChart2 className="w-8 h-8 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-green-600 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Completed</p>
              <h2 className="text-2xl font-bold text-white">{completedTasks}</h2>
            </div>
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-yellow-600 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Pending</p>
              <h2 className="text-2xl font-bold text-white">{pendingTasks}</h2>
            </div>
            <Clock className="w-8 h-8 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-purple-600 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Priority</p>
              <h2 className="text-2xl font-bold text-white">{priorityTasks}</h2>
            </div>
            <Star className="w-8 h-8 text-white" />
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-8 bg-gray-800 rounded-lg">
        <h2 className="mb-4 text-xl font-bold text-white">Weekly Task Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="tasks" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-6 bg-gray-800 rounded-lg">
          <h2 className="mb-4 text-xl font-bold text-white">Recent Tasks</h2>
          <ul className="space-y-2">
            {tasks.slice(0, 7).map(task => (
              <li key={task._id} className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id)}
                  className="w-4 h-4 mr-2 text-blue-600 bg-gray-700 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.task}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-gray-800 rounded-lg">
          <h2 className="mb-4 text-xl font-bold text-white">Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-white">
                <span>Task Completion Rate</span>
                <span>{totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-white">
                <span>On-time Delivery</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;