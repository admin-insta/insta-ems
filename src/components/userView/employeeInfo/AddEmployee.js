import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../utils/theme/Button";
import InputField from "../../utils/theme/InputField";
import TextareaField from "../../utils/theme/TextareaField";
import { addUser, updateUser } from "../../../api/users"; // Import updateUser function
import { addEmployee, updateEmployee } from "../../store/employeeSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddEmployee = ({
  openDialog,
  setOpenDialog,
  onAddEmployee,
  editingEmployee,
  setConfirmDialog,
}) => {
  const dispatch = useDispatch();
  const [isEditForm, setIsEditForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    dob: "",
    designation: "",
    joiningDate: "",
    address: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Handle invalid dates
    return date.toISOString().split("T")[0]; // Returns "YYYY-MM-DD"
  };

  // Populate form when editingEmployee changes
  useEffect(() => {
    if (editingEmployee) {
      setIsEditForm(true);

      // Split name into first and last names
      const [firstName = "", lastName = ""] = editingEmployee.name?.split(
        " "
      ) || ["", ""];

      setFormData({
        firstName,
        lastName,
        gender: editingEmployee.gender || "",
        email: editingEmployee.email || "",
        phoneNumber: editingEmployee.phoneNumber || "",
        dob: editingEmployee.dob ? formatDate(editingEmployee.dob) : "", // Handle missing dob
        designation: editingEmployee.designation || "",
        joiningDate: editingEmployee.joiningDate
          ? formatDate(editingEmployee.joiningDate)
          : "",
        address: editingEmployee.address || "",
      });
    } else {
      setIsEditForm(false);
      setFormData({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phoneNumber: "",
        dob: "",
        designation: "",
        joiningDate: "",
        address: "",
      });
    }
  }, [editingEmployee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.gender ||
      !formData.phoneNumber ||
      !formData.dob ||
      !formData.designation ||
      !formData.joiningDate ||
      !formData.address
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    formData.name = `${formData.firstName} ${formData.lastName}`;
    const fixedFormData = {
      ...formData,
      joiningDate: new Date(formData.joiningDate), // Convert string to Date
      dob: new Date(formData.dob), // Convert string to Date
    };

    try {
      let response;
      if (isEditForm && editingEmployee?._id) {
        // If editing, call update API
        response = await updateUser(editingEmployee._id, fixedFormData);
        if (response.success) {
          console.log(response.user);
          dispatch(updateEmployee(response.user));
          setConfirmDialog(false);
          toast.success("Employee updated successfully!");
        }
      } else {
        // If adding new, call add API
        response = await addUser(fixedFormData);
        if (response.success) {
          dispatch(addEmployee(response.user));
          toast.success("Employee added successfully!");
        }
      }

      if (!response.success) {
        console.error(response.message);
        setConfirmDialog(false);
        toast.error("Failed to update employee info.");
      }
    } catch (error) {
      console.error("Error adding/updating user:", error);
    }

    setOpenDialog(false);
    // setConfirmDialog(false)
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      maxWidth={false}
      PaperProps={{
        className:
          "w-full lg:w-2/3 max-w-5xl mx-auto p-6 rounded-lg shadow-lg bg-white",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <form
          className="w-full max-w-3xl bg-white shadow-lg rounded-lg m-2  p-4 border"
          onSubmit={handleFormSubmit}
        >
          <div className="bg-clay-light w-full p-4  flex items-center justify-center font-semibold text-xl">
            {isEditForm ? "Edit Employee" : "Add Employee"}
          </div>

          <div className="grid grid-cols-2 gap-4 my-4">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="text-xs font-medium text-blue-700 mb-1"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />

            <InputField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
            />
            <InputField
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
            <InputField
              label="Joining Date"
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
            />
          </div>

          <TextareaField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <div className="flex justify-center items-center mt-6 gap-4">
            <Button onClick={handleFormSubmit} type="submit">
              {isEditForm ? "Update" : "Submit"}
            </Button>
            <Button variant="secondary" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default AddEmployee;
