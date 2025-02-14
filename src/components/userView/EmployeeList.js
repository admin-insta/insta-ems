import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../utils/theme/Cards"; // Assuming Card is in the same directory

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
      className="overflow-y-auto"
      style={{ scrollbarWidth: "thin", height: "100vh" }}
    >
      {/* Wrap the entire content (heading, search input, and employee list) inside a Card */}
      <Card
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
        variant="secondary"
        title="Employee List"
        fullScreen="true"
        description={
          <div className="">
            {/* Search input inside the card */}
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block p-2 border border-gray-300 rounded-md bg-white w-full"
            />

            {/* Employee list container with flexbox layout */}
            <div className="flex flex-col">
              {filteredEmployees.map((employee, index) => (
                <div
                  className={`bg-clay p-1.5  my-1 border border-gray-400 hover:bg-white rounded-md cursor-pointer ${
                    selectedEmployee?.name === employee.firstName
                      ? "bg-gray-200"
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleEmployeeClick(employee)}
                >
                  <div className="font-semibold">
                    {employee.firstName} {employee.lastName}
                  </div>
                  <div className="text-xs ">{employee.designation}</div>
                </div>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default EmployeeList;
