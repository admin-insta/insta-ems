import React, { useState } from "react";
import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { mockAttendance } from "../../utils/mockAttendance";

const attendance = mockAttendance.attendanceData;

const AttendanceInfo = ({ view }) => {
  const [selectedDate, setSelectedDate] = useState(null); // State to track selected date

  // Function to render cells for the calendar view
  const renderCell = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const statusData = attendance[formattedDate]; // Get attendance data for the date

    if (!statusData) return null; // If no data, return nothing

    const { status } = statusData; // Extract status (present, absent, halfday)
    const statusText =
      status === "present"
        ? "P"
        : status === "absent"
        ? "A"
        : status === "halfday"
        ? "H"
        : "";

    const statusColor =
      status === "present"
        ? "text-green-500"
        : status === "absent"
        ? "text-red-500"
        : "text-yellow-500";

    return (
      <div className="flex flex-col items-left attendance-cell">
        <span className={`mt-1 text-sm font-bold ${statusColor}`}>
          {statusText}
        </span>
      </div>
    );
  };

  // Function to handle date selection
  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    setSelectedDate(formattedDate); // Update selected date
  };

  const calculateWorkingHours = (checkin, checkout) => {
    const checkinDate = new Date(`1970-01-01T${checkin}:00`);
    const checkoutDate = new Date(`1970-01-01T${checkout}:00`);

    const diffMs = checkoutDate - checkinDate; // Difference in milliseconds

    if (diffMs <= 0) return "Invalid Time"; // Handle invalid time ranges

    const hours = Math.floor(diffMs / (1000 * 60 * 60)); // Convert to hours
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Get remaining minutes

    return `${hours}h ${minutes}m`;
  };

  const selectedData = attendance[selectedDate] || {}; // Get data for the selected date

  return (
    <div className="p-4">
      {view === "grid" ? (
        <>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 bg-white shadow-lg rounded-md">
              <Calendar
                style={{ lineHeight: "0.5rem" }}
                bordered
                renderCell={renderCell} // Use renderCell to customize each cell
                className="rs-calendar"
                defaultValue={new Date("2024-12-01")} // Start with December 2024
                onChange={handleDateChange} // Handle date selection
              />
            </div>
            <div className="col-span-4 border  py-6 px-2 shadow-md rounded-md">
              <h5 className=" font-bold mb-4 text-green-700">
                Selected Date Info
              </h5>
              <div className="p-2 border-b">
                <strong className="text-red-600">Date:</strong>{" "}
                {selectedDate || "None selected"}
              </div>
              <div className="p-2 border-b">
                <strong className="text-red-600">Check-In Time:</strong>{" "}
                {selectedData.checkinTime || "-"}
              </div>
              <div className="p-2 border-b">
                <strong className="text-red-600">Check-Out Time:</strong>{" "}
                {selectedData.checkoutTime || "-"}
              </div>
              <div className="p-2 border-b">
                <strong className="text-red-600">Total Working Hours:</strong>{" "}
                {selectedData.checkinTime && selectedData.checkoutTime
                  ? calculateWorkingHours(
                      selectedData.checkinTime,
                      selectedData.checkoutTime
                    )
                  : "-"}
              </div>
              <div className="p-2 border-b">
                <strong className="text-red-600">Status:</strong>{" "}
                {selectedData.status
                  ? selectedData.status.charAt(0).toUpperCase() +
                    selectedData.status.slice(1)
                  : "-"}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white shadow-lg rounded-md p-4">
          <h2 className="text-lg font-bold mb-4 text-center">
            Attendance List
          </h2>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-200 font-semibold text-center py-2 border-b border-gray-300">
              <div>Date</div>
              <div>Status</div>
              <div>Check-In Time</div>
              <div>Check-Out Time</div>
            </div>
            {Object.entries(attendance).map(
              ([date, { status, checkinTime, checkoutTime }]) => {
                const statusText =
                  status === "present"
                    ? "Present"
                    : status === "absent"
                    ? "Absent"
                    : status === "halfday"
                    ? "Half Day"
                    : "Unknown";

                return (
                  <div
                    key={date}
                    className="grid grid-cols-4 text-center py-2 border-b border-gray-200 last:border-b-0"
                    style={{ lineHeight: "1.2rem" }}
                  >
                    <div>{date}</div>
                    <div
                      className={`${
                        status === "present"
                          ? "text-green-500"
                          : status === "absent"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {statusText}
                    </div>
                    <div>{checkinTime || "-"}</div>
                    <div>{checkoutTime || "-"}</div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceInfo;
