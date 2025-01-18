import React from "react";
import AttendanceInfo from "./AttendanceInfo";
// import { useSelector } from "react-redux";
import { mockAttendance } from "../../utils/mockAttendance";

const Attendance = () => {
    // const people = useSelector((store) => store.people || []);
  // const employee = [
  //   {
  //     id: 1,
  //     name: "Ashish Kumar",
  //   },
  //   {
  //     id: 2,
  //     name: "Anand Kumar",
  //   },
  //   {
  //     id: 3,
  //     name: "Kundan Kumar",
  //   },
  // ];
  return (
    <div className="grid grid-cols-12 gap-4 m-4">
      {/* Employee List Section */}
      <div className="col-span-3 p-4 bg-clay shadow-md rounded-md">
        <h2 className="text-lg font-bold">Employee List</h2>
        <ul className="mt-2">
          <li className="p-2 bg-white rounded-sm m-1 text-base">{mockAttendance.name}</li>
        </ul>
        {/* <ul className="mt-2">
          {employee.map((emp) => (
            <li className="p-2 bg-white rounded-sm m-1 text-base" key={emp.id}>{emp.name}</li>
          ))}
        </ul> */}
      </div>

      {/* Attendance Info Section */}
      <div className="col-span-9 p-4 bg-white shadow-md rounded-md">
        <div className="flex flex-col">
          <div className="text-center text-lg font-semibold mb-4">
            Attendance of - {mockAttendance.name}
          </div>
          <div className="w-full justify-start">
            <AttendanceInfo  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
