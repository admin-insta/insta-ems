import React from "react";
import EmployeeList from "../EmployeeList";
import { Link, Outlet, useLocation } from "react-router-dom";
const SalaryInfo = () => {
  const location = useLocation();
  const tabs = [
    { path: "/userview/salaryInfo", label: "Salary Info" },
    { path: "/userview/salaryInfo/paypackage", label: "Pay Package" },
    { path: "/userview/salaryInfo/it-statement", label: "IT Statement" },
    { path: "/userview/salaryInfo/payslip", label: "Payslip" },
    { path: "/userview/salaryInfo/ytd-statement", label: "YTD Statement" },
    { path: "/userview/salaryInfo/payment", label: "Payment" },
  ];
  return (
    <div className="grid grid-cols-12 gap-2 h-screen border-gray-300">
      <div className="col-span-3">
        <EmployeeList />
      </div>
      <div className="col-span-9 bg-[#BDBAA2]">
        <div className=" m-2">
          <ul className="grid grid-flow-col items-start font-semibold">
            {tabs.map((item) => (
              <li key={item.path} className="py-2  border-black">
                <Link
                  to={item.path}
                  className={`text-black p-3 rounded-sm ${
                    location.pathname === item.path ? "bg-gray-300 font-bold" : ""
                  }`}
                  style={{ textDecoration: "none" }}
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

export default SalaryInfo;
