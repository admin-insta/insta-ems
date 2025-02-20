import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmployeeList from "../EmployeeList";
import Card from "../../utils/theme/Cards";
import SettingsAccessibilityOutlinedIcon from "@mui/icons-material/SettingsAccessibilityOutlined";
import { DeleteForever } from "@mui/icons-material";
import { fetchUsers } from "../../../api/users";
import { addEmployee } from "../../store/employeeSlice";
import AddEmployee from "./AddEmployee";

const EmployeeInfo = () => {
  const dispatch = useDispatch();
  const employee = useSelector((store) => store.employee || []);
  console.log("poeple from store is", employee);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const handleAddEmployee = () => {
    console.log("Add employee called");
    setOpenDialog(true);
  };
  useEffect(() => {
    const getUsers = async () => {
      if (employee.length > 0) return; // Prevents fetching if users already exist

      const result = await fetchUsers();
      if (result.success) {
        dispatch(addEmployee(result.users)); // Batch add users
      } else {
        console.error(result.message);
      }
    };
    getUsers();
  }, [dispatch, employee.length]); // Dependency includes 'employee.length' to track changes

  useEffect(() => {
    if (employee.length > 0 && !selectedEmployee) {
      setSelectedEmployee(employee[0]);
    }
  }, [employee, selectedEmployee]);

  return employee.length === 0 ? (
    <div className="m-4 gap-4">
      There are no employees in your organisation, Add Employee
    </div>
  ) : (
    <div className="gap-2 grid grid-cols-12 h-screen">
      {/* Scrollable Employee List */}
      <div className="col-span-3"> 
        <EmployeeList
          onSelectEmployee={setSelectedEmployee}
          handleAddEmployee={handleAddEmployee}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>
      {/* Description Box */}
      <div className="col-span-9">
        <Card
          variant="secondary"
          fullScreen="true"
          title={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <SettingsAccessibilityOutlinedIcon /> Employee Information
            </span>
          }
          description={
            <div className="p-2">
              {selectedEmployee ? (
                <div className="bg-clay-light p-4 border border-clay rounded-md">
                  <div className="flex justify-between mx-2">
                    <span>
                      <AccountCircleIcon sx={{ fontSize: 48, color: "blue" }} />
                    </span>
                    <span>
                      <DeleteForever sx={{ fontSize: 28, color: "red" }} />
                    </span>
                  </div>

                  <div className=" flex justify-between m-4 border-b">
                    <span className="font-semibold">Employee Name:</span>{" "}
                    <span>{selectedEmployee.name}</span>
                  </div>
                  <div className=" flex justify-between m-4 border-b">
                    <span className="font-semibold">Phone Number:</span>{" "}
                    <span>{selectedEmployee.phoneNumber}</span>
                  </div>

                  <div className=" flex justify-between m-4 border-b">
                    <span className="font-semibold">Date of Birth:</span>{" "}
                    <span>{selectedEmployee.dob}</span>
                  </div>
                  <div className=" flex justify-between m-4 border-b">
                    <span className="font-semibold">Designation:</span>{" "}
                    <span>{selectedEmployee.designation}</span>
                  </div>
                  <div className=" flex justify-between m-4 border-b">
                    <span className="font-semibold">Email Id:</span>{" "}
                    <span>{selectedEmployee.email}</span>
                  </div>
                  <div className=" flex justify-between m-4 border-b">
                    <span className="font-semibold">Date of Joining:</span>{" "}
                    <span>{selectedEmployee.joiningDate}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No employee found.</p>
              )}
            </div>
          }
        />
      </div>
      {openDialog && (
        <AddEmployee openDialog={openDialog} setOpenDialog={setOpenDialog} />
      )}
    </div>
  );
};

export default EmployeeInfo;
