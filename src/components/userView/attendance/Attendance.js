import React from "react";
import AttendanceInfo from "./AttendanceInfo";
import { useSelector } from "react-redux";

const Attendance = () => {
  //   const people = useSelector((store) => store.people || []);
  const employee = [
    {
      id: 1,
      name: "Ashish Kumar",
    },
    {
      id: 2,
      name: "Anand Kumar",
    },
    {
      id: 3,
      name: "Kundan Kumar",
    },
  ];
  return (
    <div className="grid grid-cols-12 gap-4 m-4">
      {/* Employee List Section */}
      <div className="col-span-3 p-4 bg-gray-100 shadow-md rounded-md">
        <h2 className="text-lg font-bold m-2">Employee List</h2>
        <ul className="space-y-2">
          {employee.map((emp) => (
            <li className="p-2 bg-white rounded-md m-1 text-base" key={emp.id}>{emp.name}</li>
          ))}
        </ul>
      </div>

      {/* Attendance Info Section */}
      <div className="col-span-9 p-4 bg-white shadow-md rounded-md">
        <div className="flex flex-col">
          <div className="text-center text-lg font-semibold mb-4">
            Attendance of -
          </div>
          <div className="w-full justify-start">
            <AttendanceInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
