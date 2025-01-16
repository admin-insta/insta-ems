import React from "react";
import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css";

// Mock attendance data for December 2024
const attendance = {
  "2024-12-01": "P",
  "2024-12-02": "A",
  "2024-12-03": "P",
  "2024-12-04": "P",
  "2024-12-05": "A",
  "2024-12-06": "P",
  "2024-12-07": "H",
  "2024-12-08": "H",
  "2024-12-09": "P",
  "2024-12-10": "P",
  "2024-12-11": "A",
  "2024-12-12": "P",
  "2024-12-13": "P",
  "2024-12-14": "A",
  "2024-12-15": "H",
  "2024-12-16": "P",
  "2024-12-17": "P",
  "2024-12-18": "A",
  "2024-12-19": "P",
  "2024-12-20": "P",
  "2024-12-21": "H",
  "2024-12-22": "H",
  "2024-12-23": "P",
  "2024-12-24": "A",
  "2024-12-25": "H",
  "2024-12-26": "P",
  "2024-12-27": "P",
  "2024-12-28": "A",
  "2024-12-29": "H",
  "2024-12-30": "P",
  "2024-12-31": "P",
};

const AttendanceInfo = () => {
  const renderCell = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const status = attendance[formattedDate]; // Get attendance status for the date

    return (
      <div className="flex flex-col items-center">
        {status && (
          <span
            className={`mt-1 text-sm font-bold ${
              status === "P"
                ? "text-green-500"
                : status === "A"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            {status}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-start items-start p-4">
      <div className=" w-[700px] bg-gray-200 shadow-lg rounded-md">
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
