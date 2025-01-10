import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default styles

const AttendanceInfo = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    console.log("Selected date:", selectedDate); // You can replace this with your logic
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Attendance Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="border rounded-lg shadow-md"
      />
      <p className="mt-4">
        <strong>Selected Date:</strong> {date.toDateString()}
      </p>
    </div>
  );
};

export default AttendanceInfo;
