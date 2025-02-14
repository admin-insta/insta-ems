import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../utils/theme/Cards";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
const EmployeeList = ({ onSelectEmployee }) => {
  const people = useSelector((store) => store.people || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (people.length > 0) {
      setSelectedEmployee(people[0]);
      onSelectEmployee(people[0]);
    }
  }, [people, onSelectEmployee]);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    onSelectEmployee(employee);
  };

  const filteredEmployees = people.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="overflow-y-auto"
      style={{ scrollbarWidth: "thin", height: "100vh" }}
    >
      <Card
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
        variant="primary"
        title={
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <PersonOutlinedIcon /> Employee List
          </span>
        }
        fullScreen="true"
        description={
          <div>
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block p-2 border border-gray-300 rounded-md bg-white w-full"
            />
            <div className="flex flex-col">
              {filteredEmployees.map((employee) => (
                <div
                  className={`bg-clay p-1.5 my-1 border border-gray-400 hover:bg-white rounded-md cursor-pointer ${
                    selectedEmployee?.id === employee.id ? "bg-gray-200" : ""
                  }`}
                  key={employee.id}
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
