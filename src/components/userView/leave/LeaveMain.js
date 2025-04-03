import React from "react";
import EmployeeList from "../EmployeeList";
import { Link, Outlet } from "react-router-dom";
const LeaveMain = () => {

  return (
    <div className="grid grid-cols-12 gap-2 h-screen border-gray-300">
      <div className="col-span-3">
        <EmployeeList />
      </div>
      <div className="col-span-9 bg-[#BDBAA2]">
        <div className="top m-2">
          <ul className="grid grid-flow-col items-start font-semibold">
            {[
              { path: "/userview/leave", label: "Leave Management" },
              { path: "leave-apply", label: "Apply Leave" },
              { path: "leave-balance", label: "Leave Balances" },
              { path: "leave-calendar", label: "Leave Calendar" },              
              { path: "holiday-calendar", label: "Holiday Calendar" },
            ].map((item) => (
              <li key={item.path} className="p-2 border-black">
                <Link
                  className="text-black"
                  style={{ textDecoration: "none", }}
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveMain;
