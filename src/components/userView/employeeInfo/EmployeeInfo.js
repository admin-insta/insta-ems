import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmployeeList from "../EmployeeList";
import Card from "../../utils/theme/Cards";
import SettingsAccessibilityOutlinedIcon from "@mui/icons-material/SettingsAccessibilityOutlined";
import { DeleteForever } from "@mui/icons-material";
import { deleteUser } from "../../../api/users";
import { setEmployees, setSelectedEmployee } from "../../store/employeeSlice"; 
import AddEmployee from "./AddEmployee";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ConfirmationDialog from "../../utils/theme/ConfirmationDialog";

const EmployeeInfo = () => {
  const dispatch = useDispatch();
  const employees = useSelector((store) => store?.employee?.employees || []);
  const selectedEmployee = useSelector((store) => store?.employee?.selectedEmployee);

  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // ✅ Properly setting the selected employee using Redux dispatch
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(setSelectedEmployee(null));
    } else {
      const updatedEmployee = employees.find((emp) => emp._id === selectedEmployee?._id);
      dispatch(setSelectedEmployee(updatedEmployee)); // Ensure first employee is selected if current one is deleted
    }
  }, [employees, dispatch]);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setOpenDialog(true);
  };

  const handleEditEmployee = () => {
    setEditingEmployee(selectedEmployee);
    setOpenDialog(true);
  };

  const handleDeleteEmployee = async () => {
    try {
      const result = await deleteUser(selectedEmployee._id);
      if (result.success) {
        dispatch(setEmployees(result.updatedUsers));

        // ✅ Ensure the selected employee is updated after deletion
        if (result.updatedUsers.length > 0) {
          dispatch(setSelectedEmployee(result.updatedUsers[0]));
        } else {
          dispatch(setSelectedEmployee(null));
        }
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
    setConfirmDialog(false);
  };

  return employees.length === 0 ? (
    <div className="m-4 gap-4">
      There are no employees in your organisation, Add Employee
    </div>
  ) : (
    <div className="gap-2 grid grid-cols-12 h-screen">
      <div className="col-span-3">
        <EmployeeList
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
            <div className="flex justify-between mx-2">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <SettingsAccessibilityOutlinedIcon /> Employee Information
              </div>
              <div className="m-2 flex gap-8">
                <div className="flex flex-col justify-center items-center">
                  <BorderColorOutlinedIcon
                    onClick={() => {
                      setDialogAction("edit");
                      setConfirmDialog(true);
                    }}
                    sx={{ fontSize: 24, color: "blue", cursor: "pointer" }}
                  />
                  <span className="text-sm font-semibold">Edit</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <DeleteForever
                    onClick={() => {
                      setDialogAction("delete");
                      setConfirmDialog(true);
                    }}
                    sx={{ fontSize: 24, color: "red", cursor: "pointer" }}
                  />
                  <span className="text-sm font-semibold">Delete</span>
                </div>
              </div>
            </div>
          }
          description={
            <div className="p-2">
              {selectedEmployee ? (
                <div className="bg-[#f2ebd2] p-4 border border-clay rounded-md">
                  <AccountCircleIcon sx={{ fontSize: 72, color: "blue" }} />
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
                          "firstLogin",
                        ].includes(key)
                    )
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between m-4 border-b">
                        <span className="font-semibold">
                          {key.replace(/([A-Z])/g, " $1").trim().replace(/^./, (char) => char.toUpperCase())}:
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
          setConfirmDialog={setConfirmDialog}
        />
      )}
      <ConfirmationDialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        title={dialogAction === "delete" ? "Confirm Delete" : "Confirm Edit"}
        message={
          dialogAction === "delete"
            ? "Are you sure you want to delete this employee? This action cannot be undone."
            : "Are you sure you want to edit this employee's information?"
        }
        onConfirm={() => {
          if (dialogAction === "delete") {
            handleDeleteEmployee();
          } else {
            handleEditEmployee();
          }
        }}
        confirmLabel={dialogAction === "delete" ? "Delete" : "Edit"}
      />
    </div>
  );
};

export default EmployeeInfo;
