import React, { useState } from "react";
import AttendanceInfo from "./AttendanceInfo";
import { mockAttendance } from "../../utils/mockAttendance";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";

const Attendance = () => {
  const [view, setView] = useState("grid"); // Default view is grid

  const toggleView = (viewType) => {
    setView(viewType);
  };

  return (
    <div className="grid grid-cols-12 gap-4 m-4 h-screen">
      {/* Employee List Section */}
      <div className="col-span-3 p-4 bg-clay shadow-md rounded-md ">
        <h2 className="text-lg font-bold">Employee List</h2>
        <ul className="mt-2">
          <li className="p-2 bg-white rounded-sm m-1 text-base">
            {mockAttendance.name}
          </li>
        </ul>
      </div>

      {/* Attendance Info Section */}
      <div className="col-span-9 p-2 bg-white shadow-md rounded-md overflow-y-scroll">
        <div className="flex flex-col">
          <div className="text-center text-lg font-semibold mb-4 flex justify-between">
            <span>Attendance of - {mockAttendance.name}</span>
            <span className="flex gap-2">
              <GridViewIcon
                onClick={() => toggleView("grid")}
                className={`cursor-pointer ${
                  view === "grid" ? "text-blue-500" : "text-gray-500"
                }`}
              />
              <ListIcon
                onClick={() => toggleView("list")}
                className={`cursor-pointer ${
                  view === "list" ? "text-blue-500" : "text-gray-500"
                }`}
              />
            </span>
          </div>

          {/* Render content based on view */}
          <div className="w-full justify-start">
            <AttendanceInfo view={view} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
