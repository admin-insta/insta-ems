import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../utils/theme/Cards";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  setEmployees,
  setPagination,
  setSelectedEmployee,
  addEmployee,
} from "../store/employeeSlice";
import { setSalary } from "../store/salarySlice";
import { fetchSalary } from "../../api/salary";
import { fetchUsers } from "../../api/users";

const EmployeeList = ({ handleAddEmployee }) => {
  const dispatch = useDispatch();
  const { employees, currentPage, totalPages, selectedEmployee } =
    useSelector((store) => store.employee);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch first page on mount or when employees is empty
  useEffect(() => {
    const loadFirstPage = async () => {
      if (employees.length > 0) return;
      const result = await fetchUsers(1, 10);
      if (result.success) {
        dispatch(setEmployees(result.employees));
        dispatch(
          setPagination({
            currentPage: result.currentPage,
            totalPages: result.totalPages,
            totalEmployees: result.totalEmployees,
          })
        );
      }
    };
    loadFirstPage();
  }, [dispatch, employees.length]);

  // Load salary for the first employee automatically
  useEffect(() => {
    const fetchInitialSalary = async () => {
      if (employees.length > 0 && !selectedEmployee) {
        const first = employees[0];
        dispatch(setSelectedEmployee(first));
        const result = await fetchSalary(first._id);
        if (result.success) {
          dispatch(setSalary(result.salary));
        }
      }
    };
    fetchInitialSalary();
  }, [dispatch, employees, selectedEmployee]);

  const handleEmployeeClick = async (employee) => {
    dispatch(setSelectedEmployee(employee));
    const result = await fetchSalary(employee._id);
    if (result.success) dispatch(setSalary(result.salary));
    else dispatch(setSalary(null));
  };

  // Load more employees (append next page)
  const handleLoadMore = async () => {
    if (currentPage >= totalPages) return;
    const nextPage = currentPage + 1;
    const result = await fetchUsers(nextPage, 10);
    if (result.success) {
      dispatch(addEmployee(result.employees));
      dispatch(
        setPagination({
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalEmployees: result.totalEmployees,
        })
      );
    }
  };

  // Filter employees by search query
  const filteredEmployees = employees.filter((emp) => {
    const q = searchQuery.toLowerCase();
    return (
      emp.email?.toLowerCase().includes(q) ||
      emp.firstName?.toLowerCase().includes(q)
    );
  });

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
          <div className="">
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
                    key={employee._id}
                    className={`p-1 mt-1 border border-gray-400 rounded-md cursor-pointer transition hover:bg-white ${
                      selectedEmployee?._id === employee._id
                        ? "bg-white"
                        : "bg-clay hover:bg-gray-100"
                    }`}
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    <div>{employee.name || "No Name"}</div>
                    <div className="text-xs">{employee.email}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No employees found.</p>
              )}

              {/* Load More Button */}
              {currentPage < totalPages && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Load More ▼
                  </button>
                </div>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default EmployeeList;
