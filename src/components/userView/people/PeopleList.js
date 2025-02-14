import React, { useState } from "react";
// import people from "../../utils/mockData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import EmployeeList from "../EmployeeList";

const People = () => {
  const people = useSelector((store) => store.people || []);
  const [selectedEmployee, setSelectedEmployee] = useState(
    people.length > 0 ? people[0] : null
  );

  return people === null ? (
    <div className="m-4 gap-4  ">
      There are no employees in your organisation, Add Employee
    </div>
  ) : (
    <div className=" gap-4   grid grid-cols-12 h-screen">
      {/* Scrollable Employee List */}
      <div className="col-span-3 ">
        <EmployeeList />
      </div>

      {/* Description Box */}
      <div className=" p-4 relative col-span-9 ">
        {selectedEmployee ? (
          <div className="bg-clay-light p-4 border border-clay rounded-md h-80">
            <p>
              <AccountCircleIcon sx={{ fontSize: 72, color: "blue" }} />
            </p>
            <p>
              <strong>Name:</strong> {selectedEmployee.firstName}
            </p>
            <p>
              <strong>Contact:</strong> {selectedEmployee.contact}
            </p>
            <p>
              <strong>Date of Birth:</strong> {selectedEmployee.dob}
            </p>
            <p>
              <strong>Designation:</strong> {selectedEmployee.designation}
            </p>
            <p>
              <strong>Location:</strong> {selectedEmployee.address}
            </p>
            <p>
              <strong>Date of Joining:</strong> {selectedEmployee.joiningDate}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No employee found.</p>
        )}
      </div>
    </div>
  );
};

export default People;
