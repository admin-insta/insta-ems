import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../utils/theme/Cards";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { setSelectedEmployee } from "../store/employeeSlice";
import { setSalary } from "../store/salarySlice";
import { fetchSalary } from "../../api/salary"; // 👈 make sure this API accepts employeeId

const EmployeeList = ({ handleAddEmployee }) => {
  const dispatch = useDispatch();
  const employees = useSelector((store) => store?.employee?.employees || []);
  const [searchQuery, setSearchQuery] = useState("");
  const selectedEmployee = useSelector(
    (store) => store?.employee?.selectedEmployee
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      if (employees.length > 0 && !selectedEmployee) {
        const firstEmployee = employees[0];
        dispatch(setSelectedEmployee(firstEmployee));
        const result = await fetchSalary(firstEmployee._id);
        if (result.success) {
          dispatch(setSalary(result.salary));
        }
      }
    };

    fetchInitialData();
  }, [employees]);

  const handleEmployeeClick = async (employee) => {
    dispatch(setSelectedEmployee(employee));
    const result = await fetchSalary(employee._id);
    if (result.success) {
      dispatch(setSalary(result.salary));
    } else {
      dispatch(setSalary(null));
    }
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
                    className={`p-1 mt-1 border border-gray-400 rounded-md cursor-pointer transition hover:bg-white ${
                      selectedEmployee?._id === employee?._id
                        ? "bg-white"
                        : "bg-clay  hover:bg-gray-100"
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
