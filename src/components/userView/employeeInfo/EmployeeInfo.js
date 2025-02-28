import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmployeeList from "../EmployeeList";
import Card from "../../utils/theme/Cards";
import SettingsAccessibilityOutlinedIcon from "@mui/icons-material/SettingsAccessibilityOutlined";
import { DeleteForever } from "@mui/icons-material";
import { deleteUser, fetchUsers } from "../../../api/users";
import { addEmployee, setEmployees } from "../../store/employeeSlice";
import AddEmployee from "./AddEmployee";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "../../utils/theme/Button";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

const EmployeeInfo = () => {
  const dispatch = useDispatch();
  const employee = useSelector((store) => store.employee || []);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      if (employee.length > 0) return;
      const result = await fetchUsers();
      if (result.success) {
        dispatch(addEmployee(result.users));
      } else {
        console.error(result.message);
      }
    };
    getUsers();
  }, [dispatch, employee.length]);

  useEffect(() => {
    if (employee.length === 0) {
      setSelectedEmployee(null);
    } else {
      const updatedEmployee = employee.find(
        (emp) => emp._id === selectedEmployee?._id
      );
      setSelectedEmployee(updatedEmployee || employee[0]);
    }
  }, [employee]);

  const handleAddEmployee = () => {
    console.log("Add employee called");
    setEditingEmployee(null);
    setOpenDialog(true);
  };

  const handleEditEmployee = () => {
    setEditingEmployee(selectedEmployee);
    setOpenDialog(true);
  };
  const handleDeleteEmployee = async () => {
    console.log("Delete employee called", selectedEmployee);
    try {
      const result = await deleteUser(selectedEmployee._id);
      console.log("result is", result);
      if (result.success) {
        console.log("Employee deleted successfully");
        dispatch(setEmployees(result.updatedUsers));
        if (result.updatedUsers.length > 0) {
          setSelectedEmployee(result.updatedUsers[0]);
        } else {
          setSelectedEmployee(null);
        }
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
    setConfirmDialog(false);
  };

  return employee.length === 0 ? (
    <div className="m-4 gap-4">
      There are no employees in your organisation, Add Employee
    </div>
  ) : (
    <div className="gap-2 grid grid-cols-12 h-screen">
      <div className="col-span-3">
        <EmployeeList
          onSelectEmployee={setSelectedEmployee}
          handleAddEmployee={handleAddEmployee}
          handleEditEmployee={handleEditEmployee}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>
      <div className="col-span-9">
        <Card
          variant="secondary"
          fullScreen="true"
          title={
            <>
              <div className="flex justify-between mx-2">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <SettingsAccessibilityOutlinedIcon /> Employee Information
                </div>
                <div className="m-2 flex gap-8">
                  <div className="flex flex-col justify-center items-center ">
                    <span className="">
                      <BorderColorOutlinedIcon
                        onClick={() => {
                          setDialogAction("edit");
                          setConfirmDialog(true);
                        }}
                        sx={{
                          fontSize: 24,
                          color: "blue",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                    <span className="text-sm font-semibold ">Edit</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <span className="">
                      <DeleteForever
                        onClick={() => {
                          setDialogAction("delete");
                          setConfirmDialog(true);
                        }}
                        sx={{ fontSize: 24, color: "red", cursor: "pointer" }}
                      />
                    </span>
                    <span className="text-sm font-semibold ">Delete</span>
                  </div>
                </div>
              </div>
            </>
          }
          description={
            <div className="p-2">
              {selectedEmployee ? (
                <div className="bg-clay-light p-4 border border-clay rounded-md">
                  <div className="flex justify-between mx-2">
                    <span>
                      <AccountCircleIcon sx={{ fontSize: 72, color: "blue" }} />
                    </span>
                  </div>
                  {Object.entries(selectedEmployee)
                    .filter(
                      ([key]) =>
                        ![
                          "_id",
                          "subordinateIds",
                          "__v",
                          "userId",
                          "createdAt",
                          "updatedAt",
                        ].includes(key)
                    )
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between m-4 border-b"
                      >
                        <span className="font-semibold">
                          {
                            key
                              .replace(/([A-Z])/g, " $1") // Add space before capital letters
                              .trim()
                              .replace(/^./, (char) => char.toUpperCase()) // Capitalize only the first letter
                          }
                          :
                        </span>
                        <span>{value}</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">No employee found.</p>
              )}
            </div>
          }
        />
      </div>
      {openDialog && (
        <AddEmployee
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          editingEmployee={editingEmployee}
        />
      )}
      <Dialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          {dialogAction === "delete" ? "Confirm Delete" : "Confirm Edit"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogAction === "delete"
              ? "Are you sure you want to delete this employee? This action cannot be undone."
              : "Are you sure you want to edit this employee's information?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (dialogAction === "delete") {
                handleDeleteEmployee();
              } else {
                handleEditEmployee();
              }
              setConfirmDialog(false);
            }}
            variant="primary"
          >
            {dialogAction === "delete" ? "Delete" : "Edit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeInfo;
