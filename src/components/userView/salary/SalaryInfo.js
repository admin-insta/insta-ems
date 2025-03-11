import React, { useEffect, useState } from "react";
import EmployeeList from "../EmployeeList";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
const SalaryInfo = () => {
  const employee = useSelector((store) => store.employee || []);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (employee.length > 0 && !selectedEmployee) {
      setSelectedEmployee(employee[0]); // Set the first employee
    }
  }, [employee, selectedEmployee]); // Add selectedEmployee as a dependency
  return (
    <div className="grid  grid-cols-12 gap-2 h-screen border-gray-300 ">
      <div className="col-span-3 ">
        <EmployeeList onSelectEmployee={setSelectedEmployee} />
      </div>
      <div className="col-span-9 bg-clay-light">
        <div className="top m-2 ">
          <ul className="grid grid-flow-col justify-evenly font-semibold">
            <li className="p-2 border-b border-black">
              <Link className="text-black" style={{ textDecoration: 'none' }} to="/userview/salaryInfo">Salary Info</Link>
            </li>
            <li className="p-2 border-b border-black">
              <Link className="text-black" style={{ textDecoration: 'none' }} to="paypackage">Pay Package</Link>
            </li>
            <li className="p-2 border-b border-black">
              <Link className="text-black" style={{ textDecoration: 'none' }} to="it-declaration">IT Declaration</Link>
            </li>
            <li className="p-2 border-b border-black">
              <Link className="text-black" style={{ textDecoration: 'none' }} to="payslip">Payslip</Link>
            </li>
            <li className="p-2 border-b border-black">
              <Link className="text-black" style={{ textDecoration: 'none' }} to="ytd-statement">YTD Statement</Link>
            </li>
            <li className="p-2 border-b border-black">
              <Link className="text-black" style={{ textDecoration: 'none' }} to="payment">Payment</Link>
            </li>
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
