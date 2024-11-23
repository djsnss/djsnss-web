// // src/App.js

// import React from 'react';
// import CalendarComponent from './CalendarComponent';
// import './App.css';

// const App = () => {
//     const isAdmin = true; // Set this based on your authentication logic

//     return (
//         <div className="App">
//             <h1>React Calendar Integration</h1>
//             <CalendarComponent isAdmin={isAdmin} />
//         </div>
//     );
// };

// export default App;



import React, { useState } from "react";
import "./calendar.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [newEvent, setNewEvent] = useState("");

  const generateCalendarDays = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push({ day: null });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({ day });
    }
    return calendarDays; 
  };

  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth, day).toDateString();
    setSelectedDate(date);
    setSelectedTime(""); // Reset selected time when changing date
  };

  const handleAddEvent = () => {
    if (newEvent && selectedDate && selectedTime) {
      setEvents([...events, { date: selectedDate, title: newEvent, time: selectedTime }]);
      setNewEvent("");
      setSelectedTime("");
    }
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter(event => event !== eventToDelete));
  };

  const renderEvents = (day) => {
    const date = new Date(currentYear, currentMonth, day).toDateString();
    return events
      .filter((event) => event.date === date)
      .map((event, index) => (
        <div key={index} className="event">
          {event.title} at {event.time}
          <button onClick={() => handleDeleteEvent(event)} className="ml-2 text-red-500 hover:text-red-700">Delete</button>
        </div>
      ));
  };

  const selectedEvents = events.filter((event) => event.date === selectedDate);
  
  const days = generateCalendarDays(currentMonth, currentYear);

  const handleMonthChange = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDate(null); // Clear selected date on month/year change
    setSelectedTime(""); // Reset selected time
  };

  // Time slots for the day
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM"
  ];

  return (
    <div className="app">
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => handleMonthChange(-1)}>❮</button>
          <h2>
            {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
          </h2>
          <button onClick={() => handleMonthChange(1)}>❯</button>
        </div>
        <div className="calendar">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <div key={index} className="day-header">{day}</div>
          ))}
          {days.map((item, index) =>
            item.day ? (
              <div
                key={index}
                className={`day ${
                  selectedDate === new Date(currentYear, currentMonth, item.day).toDateString() ? "selected" : ""
                }`}
                onClick={() => handleDateClick(item.day)}
              >
                <span>{item.day}</span>
                {renderEvents(item.day)}
              </div>
            ) : (
              <div key={index} className="empty"></div>
            )
          )}
        </div>
      </div>
      <div className="sidebar">
        <h2>{selectedDate || "Select a Date"}</h2>
        {selectedDate && (
          <>
            <h3>Select a Time:</h3>
            <select 
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)} 
              className="time-select"
            >
              <option value="">-- Select Time --</option>
              {timeSlots.map((timeSlot) => (
                <option key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
            />
            <button onClick={handleAddEvent}>Add Event</button>
            <div className="event-list">
              <h3>Events:</h3>
              {selectedEvents.length > 0 ? (
                selectedEvents.map((event, index) => (
                  <div key={index} className="event-item">
                    {event.title} at {event.time}
                    {/* Add delete button */}
                    <button onClick={() => handleDeleteEvent(event)} className="ml-2 text-red-500 hover:text-red-700">Delete</button>
                  </div>
                ))
              ) : (
                <p>No events for this day</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;