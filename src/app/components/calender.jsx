"use client"
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'pixel-retroui';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';

const RetroCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [panchang, setPanchang] = useState('');

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  useEffect(() => {
    const panchangItems = [
      "Tithi: Shukla Paksha",
      "Nakshatra: Rohini",
      "Yoga: Siddha",
      "Karana: Bava",
      "Rahu Kalam: 9:00 AM - 10:30 AM",
    ];
    setPanchang(panchangItems[Math.floor(Math.random() * panchangItems.length)]);
  }, [currentDate]);

  const getHinduMonth = (month) => {
    const hinduMonths = [
      "Chaitra", "Vaisakha", "Jyestha", "Ashadha",
      "Shravana", "Bhadrapada", "Ashvina", "Kartika",
      "Margashirsha", "Pausha", "Magha", "Phalguna"
    ];
    return hinduMonths[month];
  };
const getEngMonths=(month)=>{
  const engMonths=[
    "Jan","Feb","Mar",
    "Apr","May","Jun",
    "Jul","Aug","Sep",
    "Oct","Nov","Dec"
  ]
  return engMonths[month]
}

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let day = 1; day <= days; day++) {
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      const dayContent = () => {
        if (day % 2 === 0) return <Sun className="inline w-4 h-4 mr-1 text-yellow-500" />;
        return <Moon className="inline w-4 h-4 mr-1 text-blue-300" />;
      };
      calendarDays.push(
        <div
          key={day}
          className={`p-2 border border-orange-300 hover:bg-yellow-100 cursor-pointer ${
            isToday ? 'bg-orange-200' : ''
          }`}
        >
          {dayContent()}
          <span className="font-semibold">{day}</span>
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <Card className="w-full h-full rounded-lg shadow-lg bg-orange-50 font-sanskrit">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 bg-orange-200 rounded-t-lg">
          <Button onClick={prevMonth} className="text-white bg-red-500 hover:bg-red-600">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h3 className="text-3xl font-bold text-red-800">
            {getHinduMonth(currentDate.getMonth())} AKA {getEngMonths(currentDate.getMonth())} {currentDate.getFullYear()}
          </h3>
          <Button onClick={nextMonth} className="text-white bg-red-500 hover:bg-red-600">
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 p-2 font-bold text-center bg-orange-100">
          {['Ravi', 'Soma', 'Mangala', 'Budha', 'Guru', 'Shukra', 'Shani'].map(day => (
            <div key={day} className="p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid flex-grow grid-cols-7 gap-1 p-2 bg-orange-50">
          {renderCalendar()}
        </div>
        <div className="p-4 text-center bg-orange-200 rounded-b-lg">
          <h4 className="mb-2 text-xl font-semibold text-red-800">Today&apos;s Panchang</h4>
          <p className="text-lg">{panchang}</p>
        </div>
      </div>
    </Card>
  );
};

export default RetroCalendar;