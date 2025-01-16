import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { addPeople, removePeople, editPeople } from "../../store/peopleSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ManagePeople = () => {
  const people = useSelector((store) => store.people);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open dialog for adding a new employee
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

  // Open dialog for editing an employee
  const handleEditEmployee = (employee) => {
    setFormData(employee);
    setIsEditing(true);
    setOpen(true);
  };

  // Handle form submission for adding or editing
  const handleFormSubmit = (e) => {
    e.preventDefault();

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
      dispatch(editPeople(formData)); // Dispatch edit action
    } else {
      dispatch(addPeople({ ...formData, id: Date.now() })); // Dispatch add action
    }

    setOpen(false);
  };

  // Handle deleting an employee
  const handleDeleteEmployee = (employee) => {
    dispatch(removePeople(employee));
  };

  return (
    <>
      <div className="flex justify-around">
        <div className="m-4 rounded-md">
          <h4 className="m-4 text-center font-semibold">
            Manage Your Employees
          </h4>
          <button
            onClick={handleAddClick}
            className="bg-gray-800 m-4 p-2 rounded-md text-white"
          >
            Add People to your organisation
          </button>
        </div>

        <div className="m-4 w-1/2 rounded-md border shadow-md">
          <h4 className="m-4 text-center font-semibold">Employee List</h4>
          <div>
            {people.length === 0 ? (
              <div className="m-4 font-semibold text-lg p-4 text-gray-600 text-center">
                No employee information is available. Please add Employee
                details.{" "}
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
                    <div className="flex-1 text-center">
                      {person.designation}
                    </div>
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
      </div>

      {/* Dialog for adding/editing employee */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <div className="m-2 p-2 font-semibold flex justify-center">
          <h1 className="px-8 py-2 bg-red-600 rounded-md text-white">
            {isEditing ? "Edit Employee" : "Add Employee"}
          </h1>
        </div>
        <form className="m-2 border shadow-md" onSubmit={handleFormSubmit}>
          <div className="flex justify-between">
            <div className="m-2">
              <label className="text-xs text-blue-600 p-1">First Name</label>
              <input
                className="border p-1 m-1 shadow-inner w-64"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
            </div>
            <div className="m-2">
              <label className="text-xs text-blue-600 p-1">Last Name</label>
              <input
                className="border p-1 m-1 shadow-inner w-64"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="m-2">
              <label className="text-xs text-blue-600 p-1">Email</label>
              <input
                className="border p-1 m-1 shadow-inner w-64"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
            <div className="m-2">
              <label className="text-xs text-blue-600 p-1">Contact</label>
              <input
                className="border p-1 m-1 shadow-inner w-64"
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="m-2">
              <label className="text-xs text-blue-600 p-1">Date of Birth</label>
              <input
                className="border p-1 m-1 shadow-inner w-64"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="m-2">
              <label className="text-xs text-blue-600 p-1">Designation</label>
              <input
                className="border p-1 m-1 shadow-inner w-64"
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Designation"
              />
            </div>
          </div>

          <div className="m-2">
            <label className="text-xs text-blue-600 p-1">Joining Date</label>
            <input
              className="border p-1 m-1 shadow-inner w-64"
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="m-2">
            <label className="text-xs text-blue-600 p-1">Address</label>
            <textarea
              className="border p-1 m-1 shadow-inner w-full"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="m-2 p-2 bg-red-600 text-white rounded-md"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="m-2 p-2 bg-blue-600 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default ManagePeople;
