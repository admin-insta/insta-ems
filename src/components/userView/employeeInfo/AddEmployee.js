import { Dialog } from "@mui/material";
import React, { useState } from "react";
import Button from "../../utils/theme/Button";
import InputField from "../../utils/theme/InputField";
import TextareaField from "../../utils/theme/TextareaField";
import { addUser } from "../../../api/users";
import { addEmployee } from "../../store/employeeSlice";
import { useDispatch } from "react-redux";

const AddEmployee = ({ openDialog, setOpenDialog, onAddEmployee }) => { 
  const dispatch = useDispatch();
  const [isEditForm, setIsEditForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    designation: "",
    joiningDate: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("submit called");
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.dob ||
      !formData.designation ||
      !formData.joiningDate ||
      !formData.address
    ) {
      alert("Please fill out all fields.");
      return;
    }

    formData.name = `${formData.firstName} ${formData.lastName}`;
    const fixedFormData = {
      ...formData,
      joiningDate: new Date(formData.joiningDate), // Convert string to Date
      dob: new Date(formData.dob), // Convert string to Date
    };
    
    try{
      const response = await addUser(fixedFormData);
      if (response.success) {
        dispatch(addEmployee(response.user));
      } else {
        console.error(response.message);
      }
    }catch(error){
      console.error("Error adding user")
    }  
    
    if (onAddEmployee) {
      onAddEmployee(formData);
    }
    setOpenDialog(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dob: "",
      designation: "",
      joiningDate: "",
      address: "",
    });
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth={false}
        PaperProps={{
          className:
            "w-full lg:w-2/3 max-w-5xl mx-auto p-6 rounded-lg shadow-lg bg-white",
        }}
      >
        <div className="flex flex-col items-center justify-center p-6 ">
          <div className="mb-4 text-xl font-semibold text-center">
            <Button variant="secondary">
              {isEditForm ? "Edit Employee" : "Add Employee"}
            </Button>
          </div>

          <form className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
              <InputField label="Contact" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
              <InputField label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
              <InputField label="Designation" name="designation" value={formData.designation} onChange={handleInputChange} />
              <InputField label="Joining Date" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} />
            </div>
            
            <TextareaField label="Address" name="address" value={formData.address} onChange={handleInputChange} />
            
            <div className="flex justify-center items-center mt-6 gap-4">
              <Button onClick={handleFormSubmit} type="submit">{isEditForm ? "Update" : "Submit"}</Button>
              <Button variant="secondary" onClick={() => setOpenDialog(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default AddEmployee;
