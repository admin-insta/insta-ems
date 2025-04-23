import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmployeeList from "../EmployeeList";
import Card from "../../utils/theme/Cards";
import { deleteUser } from "../../../api/users";
import { setEmployees, setSelectedEmployee } from "../../store/employeeSlice";
import AddEmployee from "./AddEmployee";
import ConfirmationDialog from "../../utils/theme/ConfirmationDialog";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa6";
import { toast } from "react-toastify";
import { uploadProfilePicture } from "../../../api/profilePicture";
import { setUser } from "../../store/userSlice";
import { TbUserEdit } from "react-icons/tb";
const EmployeeInfo = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store?.user);
  const employees = useSelector((store) => store?.employee?.employees || []);
  const selectedEmployee = useSelector(
    (store) => store?.employee?.selectedEmployee
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // ✅ Properly setting the selected employee using Redux dispatch
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(setSelectedEmployee(null));
    } else {
      const updatedEmployee = employees.find(
        (emp) => emp._id === selectedEmployee?._id
      );
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
        toast.success("Employee deleted successfully!");
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

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Select Your Image and Try Again");
      return;
    }

    try {
      const response = await uploadProfilePicture(file);
      console.log("profile pic response", response);
      if (response.success) {
        toast.success("Profile picture updated successfully!");
        dispatch(setSelectedEmployee(response.user)); // Assuming backend returns updatedUser
        dispatch(
          setUser({
            uid: response.user._id,
            email: response.user.email,
            name: response.user.name || "No Name",
            profilePicture: response.user.profilePicture || "",
            firstLogin: response.firstLogin,
          })
        );
      } else {
        toast.error(response.message || "Failed to update profile picture");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("An error occurred while uploading the picture.");
    }
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
          variant="primary"
          fullScreen="true"
          title={
            <div className="flex justify-between mx-2">
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FaUserTie className="w-6 h-6" /> Employee Information             
              </div>
              <div className="m-2 flex gap-8">
                <div
                  className="flex flex-col justify-center items-center cursor-pointer  text-blue-700"
                  onClick={() => {
                    setDialogAction("edit");
                    setConfirmDialog(true);
                  }}
                >
                  <LiaUserEditSolid className="w-6 h-6" />
                  <span className="text-sm font-semibold">Edit</span>
                </div>

                <div
                  className="flex flex-col justify-center items-center text-[#FF0000] cursor-pointer"
                  onClick={() => {
                    setDialogAction("delete");
                    setConfirmDialog(true);
                  }}
                >
                  <RiDeleteBin2Line className="w-6 h-6 " />

                  <span className="text-sm font-semibold">Delete</span>
                </div>
              </div>
            </div>
          }
          description={
            <div className="p-2">
              {selectedEmployee ? (
                <div className="bg-clay p-4 border border-clay rounded-md">
                  {/* Profile Picture or Icon */}
                  {selectedEmployee?.profilePicture ? (
                    <img
                      className="hover:opacity-90 hover:scale-110 transition-all ease-in-out"
                      src={selectedEmployee.profilePicture}
                      alt={`${selectedEmployee.name}'s profile`}
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        objectPosition: "center 10% ", // Ensure the center of the image is shown
                      }}
                    />
                  ) : (
                    <AccountCircleIcon sx={{ fontSize: 96, color: "blue" }} />
                  )}
                  {loggedInUser?.uid === selectedEmployee?._id ? (
                    <label className="text-blue-700 cursor-pointer text-sm ">
                      <span className=" items-center inline-flex justify-center ml-1 hover:underline ">Edit Picture <TbUserEdit className="h-6 w-6" /></span>
                      <input
                        className="inline-block"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  ) : null}

                  {/* Details */}
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
                          "profilePicture", // skip displaying the picture path here again
                        ].includes(key)
                    )
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between m-4 border-b"
                      >
                        <span className="font-semibold">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .replace(/^./, (char) => char.toUpperCase())}
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
