import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EmployeeList = () => {
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
  return (
    <div
      className="overflow-y-auto max-h-96 border-r border-gray-300  "
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
          {employee.firstName}{" "}{employee.lastName}
          <p className="text-xs">{employee.designation}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
