import React, { useState, useEffect } from "react";
// import people from "../../utils/mockData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";

const People = () => {
  const people = useSelector((store) => store.people || []);
  const [selectedEmployee, setSelectedEmployee] = useState(
    people.length > 0 ? people[0] : null
  );

  const [searchQuery, setSearchQuery] = useState("");

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const filteredEmployees = people.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Set the first employee in the filtered list only if no employee is selected
    if (!selectedEmployee && filteredEmployees.length > 0) {
      setSelectedEmployee(filteredEmployees[0]);
    }
  }, [filteredEmployees, selectedEmployee]);

  return people === null ? (
    <div>There are no employees in your organisation, Add Employee</div>
  ) : (
    <div className="m-8 border border-gray-300 flex ">
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
              selectedEmployee?.name === employee.firstName ? "bg-gray-200" : ""
            }`}
            key={index}
            onClick={() => handleEmployeeClick(employee)}
          >
            {employee.firstName}
            <p className="text-xs">{employee.designation}</p>
          </div>
        ))}
      </div>

      {/* Description Box */}
      <div className="w-2/3 p-4 relative">
        {selectedEmployee ? (
          <div className="bg-gray-100 p-4 border border-clay rounded-md h-80">
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
