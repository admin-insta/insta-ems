import React, { useEffect, useState } from "react";
import EmployeeList from "../EmployeeList";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const SalaryInfo = () => {
  const employees = useSelector((store) => store?.employee || []);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (employees.length === 0) {
      setSelectedEmployee(null);
    } else {
      setSelectedEmployee((prevSelected) => {
        return employees.find((emp) => emp._id === prevSelected?._id) || employees[0];
      });
    }
  }, [employees]);
  console.log("selected employee", selectedEmployee)

  return (
    <div className="grid grid-cols-12 gap-2 h-screen border-gray-300">
      <div className="col-span-3">
        <EmployeeList onSelectEmployee={setSelectedEmployee} />
      </div>
      <div className="col-span-9 bg-clay-light">
        <div className="top m-2">
          <ul className="grid grid-flow-col items-start font-semibold">
            {[
              { path: "/userview/salaryInfo", label: "Salary Info" },
              { path: "paypackage", label: "Pay Package" },
              { path: "it-statement", label: "IT Statement" },
              { path: "payslip", label: "Payslip" },
              { path: "ytd-statement", label: "YTD Statement" },
              { path: "payment", label: "Payment" },
            ].map((item) => (
              <li key={item.path} className="p-2 border-black">
                <Link
                  className="text-black"
                  style={{ textDecoration: "none" }}
                  to={item.path}
                  state={{ selectedEmployee }}
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
