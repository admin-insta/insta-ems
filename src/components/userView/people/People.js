import React, { useState, useEffect } from "react";
import employeeList from "../../utils/mockData"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const People = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(
    employeeList.length > 0 ? employeeList[0] : null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const filteredEmployees = employeeList.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Set the first employee in the filtered list only if no employee is selected
    if (!selectedEmployee && filteredEmployees.length > 0) {
      setSelectedEmployee(filteredEmployees[0]);
    }
  }, [filteredEmployees, selectedEmployee]);

  return (
    <div className="m-4 border border-gray-300 flex">
      {/* Scrollable Employee List */}
      <div
        className="overflow-y-auto max-h-96 border-r border-gray-300 w-1/3"
        style={{ scrollbarWidth: "thin" }}
      >
        <h1 className="text-lg mx-4 my-2">Employee List</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-11/12 mx-auto my-2 p-2 border border-gray-300 rounded-sm"
        />
        {filteredEmployees.map((employee, index) => (
          <div
            className={`bg-clay p-1 mx-4 my-1 border border-gray-400 hover:bg-white rounded-sm cursor-pointer ${
              selectedEmployee?.name === employee.name ? "bg-gray-200" : ""
            }`}
            key={index}
            onClick={() => handleEmployeeClick(employee)}
          >
            {employee.name}
            <p className="text-xs">{employee.designation}</p>
          </div>
        ))}
      </div>

      {/* Description Box */}
      <div className="w-2/3 p-4 relative">
        {selectedEmployee ? (
          <div className="bg-gray-100 p-4 border border-clay rounded-md h-80">
            <p>
              <AccountCircleIcon sx={{ fontSize: 72, color:"blue" }} />
            </p>
            <p>
              <strong>Name:</strong> {selectedEmployee.name}
            </p>
            <p>
              <strong>Contact:</strong> {selectedEmployee.contact}
            </p>
            <p>
              <strong>Designation:</strong> {selectedEmployee.designation}
            </p>
            <p>
              <strong>Location:</strong> {selectedEmployee.location}
            </p>
            <p>
              <strong>Date of Birth:</strong> {selectedEmployee.dateOfBirth}
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
