import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../utils/theme/Cards";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { setSelectedEmployee } from "../store/employeeSlice";
const EmployeeList = ({  handleAddEmployee }) => {
  const dispatch = useDispatch()
  const employees = useSelector((store) => store?.employee?.employees || []);
  const [searchQuery, setSearchQuery] = useState("");
  const selectedEmployee = useSelector((store)=>store?.employee?.selectedEmployee)

  useEffect(() => {
    if (employees.length > 0 && !selectedEmployee) {
      const firstEmployee = employees[0]; 
      dispatch(setSelectedEmployee(firstEmployee));
    }
  }, [employees]); 
  
  const handleEmployeeClick = (employee) => {
    dispatch(setSelectedEmployee(employee));
 
  };

  // Filter employees by email or name (case-insensitive)
  const filteredEmployees = employees?.filter(
    (employee) =>
      employee?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (employee?.firstName &&
        employee?.firstName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ scrollbarWidth: "thin", height: "auto" }}>
      <Card
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
        variant="primary"
        title={
          <div className="flex justify-between items-center mx-2">
            <span className="flex items-center gap-2">
              <PersonOutlinedIcon /> Employee List
            </span>
            {handleAddEmployee && (
              <button
                onClick={handleAddEmployee}
                className="text-xl font-bold hover:text-blue-600 transition duration-200"
              >
                +
              </button>
            )}
          </div>
        }
        fullScreen="true"
        description={
          <div>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block p-2 border border-gray-300 rounded-md bg-white w-full mb-2"
            />

            {/* Employee List */}
            <div className="flex flex-col ">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <div
                    key={employee?._id}
                    className={`p-2 m-1 border border-gray-400 rounded-md cursor-pointer transition hover:bg-white ${
                      selectedEmployee?.id === employee?.id
                        ? "bg-gray-200"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    <div className="">{employee?.name || "No Name"}</div>
                    <div className="text-xs">{employee?.email}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No employees found.</p>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default EmployeeList;
