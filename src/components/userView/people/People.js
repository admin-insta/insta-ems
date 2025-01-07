import React, { useState } from "react";
import employeeList from "../../utils/mockData"; // Adjust the path if needed
import PersonIcon from '@mui/icons-material/Person';
const People = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee((prev) =>
      prev?.name === employee.name ? null : employee
    );
  };

  return (
    <div className="m-4 border border-gray-300">
      <h1 className="text-lg mx-4 my-2">Employee List</h1>
      <div>
        {employeeList.map((employee, index) => (
          <div className="flex" key={index}>
            <div
              className="bg-gray-200 p-2 mx-4 my-1 border border-gray-400 rounded-sm w-1/3 cursor-pointer h-fit"
              onClick={() => handleEmployeeClick(employee)}
            >
              {employee.name}
            </div>
            {/* Display description box if this employee is selected */}
            {selectedEmployee?.name === employee.name && (
              <div className="bg-blue-100 p-4 m-2 border border-blue-300 rounded-md w-3/5 h-96 absolute top-32 right-4">
                <p><PersonIcon sx= {{fontSize:44}}/></p>
                <p>
                  <strong>Name:</strong> {employee.name}
                </p>
                <p>
                  <strong>Contact:</strong> {employee.contact}
                </p>
                <p>
                  <strong>Designation:</strong> {employee.designation}
                </p>
                <p>
                  <strong>Location:</strong> {employee.location}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {employee.dateOfBirth}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
