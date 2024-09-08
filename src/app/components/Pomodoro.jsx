import React, { useState, useEffect } from 'react';
import { Button, Card } from 'pixel-retroui';

const Pomodoro = () => {
  const [time, setTime] = useState(60 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(60 * 60);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-4 mb-8 bg-yellow-100 rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Pomodoro Timer</h2>
      <div className="mb-4 text-4xl font-bold">{formatTime(time)}</div>
      <div className="flex justify-center space-x-4">
        <Button onClick={toggleTimer} className={isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}>
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={resetTimer} className="bg-gray-500 hover:bg-gray-600">Reset</Button>
      </div>
    </Card>
  );
};

export default Pomodoro;
