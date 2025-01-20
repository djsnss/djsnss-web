import React, { useState } from "react";
import "./Calendar.css";

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
    for (let i = 0; i < firstDay; i++) calendarDays.push({ day: null });
    for (let day = 1; day <= daysInMonth; day++) calendarDays.push({ day });
    return calendarDays;
  };

  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth, day).toDateString();
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleAddEvent = () => {
    if (newEvent && selectedDate && selectedTime) {
      setEvents([...events, { date: selectedDate, title: newEvent, time: selectedTime }]);
      setNewEvent("");
      setSelectedTime("");
    }
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter((event) => event !== eventToDelete));
  };

  const renderEvents = (day) => {
    const date = new Date(currentYear, currentMonth, day).toDateString();
    return events
      .filter((event) => event.date === date)
      .map((event, index) => (
        <div key={index} className="text-sm text-white mt-2 p-1 bg-blue-600 rounded">
          {event.title} at {event.time}
          <button
            onClick={() => handleDeleteEvent(event)}
            className="ml-2 text-red-400 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      ));
  };

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
    setSelectedDate(null);
    setSelectedTime("");
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ];

  const days = generateCalendarDays(currentMonth, currentYear);

  return (
    <div className="app flex flex-col md:flex-row gap-5 p-5 bg-sky-100 text-sky-900 min-h-screen">
      {/* Calendar Section */}
      <div className="calendar-container w-full md:w-3/4 flex-grow p-5 bg-sky-700 border border-blue-500 rounded-lg shadow-lg">
        <div className="calendar-header flex justify-between items-center mb-5">
          <button onClick={() => handleMonthChange(-1)} className="text-lg text-white hover:text-blue-700">
            ❮
          </button>
          <h2 className="text-xl font-bold">
            {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })}{" "}
            {currentYear}
          </h2>
          <button onClick={() => handleMonthChange(1)} className="text-lg text-white hover:text-blue-700">
            ❯
          </button>
        </div>
        <div className="calendar grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <div key={index} className="text-center font-bold day-header">
              {day}
            </div>
          ))}
          {days.map((item, index) =>
            item.day ? (
              <div
                key={index}
                className={`day flex flex-col justify-between items-center p-2 rounded cursor-pointer ${
                  selectedDate === new Date(currentYear, currentMonth, item.day).toDateString()
                    ? "selected"
                    : ""
                } hover:bg-blue-300`}
                onClick={() => handleDateClick(item.day)}
              >
                <span className="text-lg">{item.day}</span> {/* Increased font size for better visibility */}
                {renderEvents(item.day)}
              </div>
            ) : (
              <div key={index} className="empty"></div>
            )
          )}
        </div>
      </div>
      {/* Sidebar Section */}
      <div className="sidebar w-full md:w-1/4 p-5 bg-sky-600 border border-blue-500 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">{selectedDate || "Select a Date"}</h2>
        {selectedDate && (
          <>
            <h3 className="mt-4 text-white font-bold">Select a Time:</h3>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full bg-sky-200 text-sky-900 p-2 rounded mt-2"
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
              className="w-full bg-sky-200 text-sky-900 p-2 rounded mt-2"
            />
            <button
              onClick={handleAddEvent}
              className="w-full bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600"
            >
              Add Event
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App; 
