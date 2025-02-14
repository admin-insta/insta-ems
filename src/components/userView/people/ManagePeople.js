import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { addPeople, removePeople, editPeople } from "../../store/peopleSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "../../utils/theme/Button";
import Card from "../../utils/theme/Cards";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

const ManagePeople = () => {
  const people = useSelector((store) => store.people);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    dob: "",
    designation: "",
    joiningDate: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      dob: "",
      designation: "",
      joiningDate: "",
      address: "",
    });
    setIsEditing(false);
    setOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setConfirmDialog({
      open: true,
      title: "Confirm Edit",
      message: "Are you sure you want to edit this employee's details?",
      onConfirm: () => {
        setFormData(employee);
        setIsEditing(true);
        setOpen(true);
        setConfirmDialog({ open: false });
      },
    });
  };

  const handleDeleteEmployee = (employee) => {
    setConfirmDialog({
      open: true,
      title: "Confirm Delete",
      message: "Are you sure you want to delete this employee?",
      onConfirm: () => {
        dispatch(removePeople(employee));
        setConfirmDialog({ open: false });
      },
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("submit called");
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.contact ||
      !formData.dob ||
      !formData.designation ||
      !formData.joiningDate ||
      !formData.address
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (isEditing) {
      dispatch(editPeople(formData));
    } else {
      try {
        const response = await fetch(
          "https://instaems-backend.onrender.com/api/users/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        console.log(response);
      } catch (error) {
        console.error(" Error in adding:", error);
        // setErrorMessage("Something went wrong. Please try again.");
      }
      dispatch(addPeople({ ...formData, id: Date.now() }));
    }

    setOpen(false);
  };

  return (
    <>
      <div className=" space-y-2">
        <div className=" rounded-md">
          <Card
            variant="primary"
            // title="Manage Your Employee"
            description={
              <div className="flex justify-between mx-4 my-2">
                <h5 className=" flex  font-semibold">
                  <ManageAccountsOutlinedIcon />{"  "} <span>Manage Your Organisation</span>
                </h5>
                <div className="">
                  <Button variant="secondary" onClick={handleAddClick}>
                    Add People to your organisation
                  </Button>
                </div>
              </div>
            }
          />
        </div>
        <Card
          variant="secondary"
          // fullScreen="true"
          description={
            <div className=" -my-4">
              <h4 className="m-4 font-semibold border-b">Employee List</h4>
              <div>
                {people.length === 0 ? (
                  <div className="m-4 font-semibold text-lg p-4  text-center">
                    No employee information is available. Please add Employee
                    details.
                  </div>
                ) : (
                  <div>
                    {people.map((person, id) => (
                      <div
                        className="m-2 p-2 flex items-center justify-between border-b border-gray-200"
                        key={id}
                      >
                        <div className="flex-1">
                          {person.firstName} {person.lastName}
                        </div>
                        <div className="flex-1 ">{person.designation}</div>
                        <div className="flex-1 text-right cursor-pointer">
                          <EditIcon
                            className="cursor-pointer"
                            onClick={() => handleEditEmployee(person)}
                          />
                        </div>
                        <div className="flex-1 text-right cursor-pointer">
                          <DeleteForeverIcon
                            onClick={() => handleDeleteEmployee(person)}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          }
        />
      </div>

      {/* Dialog for adding/editing employee */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={false}
        PaperProps={{
          className:
            "w-full lg:w-2/3 max-w-5xl mx-auto p-6 rounded-lg shadow-lg bg-white",
        }}
      >
        <div className="flex flex-col items-center justify-center p-6 ">
          <div className="mb-4 text-xl font-semibold text-center">
            <Button variant="secondary">
              {isEditing ? "Edit Employee" : "Add Employee"}
            </Button>
          </div>

          <form
            className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6"
            onSubmit={handleFormSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col">
                <label className="text-xs text-blue-600 mb-1">First Name</label>
                <input
                  className="border p-2 rounded-md w-full"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label className="text-xs text-blue-600 mb-1">Last Name</label>
                <input
                  className="border p-2 rounded-md w-full"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-xs text-blue-600 mb-1">Email</label>
                <input
                  className="border p-2 rounded-md w-full"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>

              {/* Contact */}
              <div className="flex flex-col">
                <label className="text-xs text-blue-600 mb-1">Contact</label>
                <input
                  className="border p-2 rounded-md w-full"
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label className="text-xs text-blue-600 mb-1">
                  Date of Birth
                </label>
                <input
                  className="border p-2 rounded-md w-full"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>

              {/* Designation */}
              <div className="flex flex-col">
                <label className="text-xs text-blue-600 mb-1">
                  Designation
                </label>
                <input
                  className="border p-2 rounded-md w-full"
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Designation"
                />
              </div>

              {/* Joining Date */}
              <div className="flex flex-col">
                <label className="text-xs text-blue-600 mb-1">
                  Joining Date
                </label>
                <input
                  className="border p-2 rounded-md w-full"
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Address */}
            <div className="mt-4">
              <label className="text-xs text-blue-600 mb-1">Address</label>
              <textarea
                className="border p-2 rounded-md w-full"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center mt-6 gap-4">
              <Button onClick={handleFormSubmit} type="submit">
                {isEditing ? "Update" : "Submit"}
              </Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={confirmDialog.onConfirm}
            className="m-2 p-2 bg-red-600 text-white rounded-md"
          >
            Confirm
          </Button>
          <Button
            variant="secondary"
            onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
            className="m-2 p-2 bg-blue-600 text-white rounded-md"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManagePeople;
