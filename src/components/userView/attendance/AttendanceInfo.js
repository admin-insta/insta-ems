import React from "react";
import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { mockAttendance } from "../../utils/mockAttendance";

// Mock attendance data for December 2024
console.log("Mock attendance data:", mockAttendance.attendanceData);
const attendance = mockAttendance.attendanceData;

const AttendanceInfo = () => {
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
      <div className="flex flex-col items-center">
        <span className={`mt-1 text-sm font-bold ${statusColor}`}>
          {statusText}
        </span>
      </div>
    );
  };

  return (
    <div className="flex justify-start items-start p-4">
      <div className="w-[700px] bg-white shadow-lg rounded-md">
        <Calendar
          bordered
          renderCell={renderCell} // Use renderCell to customize each cell
          className="rs-calendar"
          defaultValue={new Date("2024-12-01")} // Start with December 2024
        />
      </div>
    </div>
  );
};

export default AttendanceInfo;
