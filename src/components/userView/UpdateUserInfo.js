import React, { use, useState } from "react";
import InputField from "../utils/theme/InputField";
import Button from "../utils/theme/Button";
import { updateUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import TextareaField from "../utils/theme/TextareaField";
import { useSelector } from "react-redux";

const UpdateUserInfo = () => {
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user.email,
    phoneNumber: "",
    dob: "",
    designation: "",
    joiningDate: "",
    address: "",
  });

  const handleInputChange = async (e) => {
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
    const{email, ...fixedFormData} = {
      ...formData,
      joiningDate: new Date(formData.joiningDate), // Convert string to Date
      dob: new Date(formData.dob), // Convert string to Date
    };

    try {
      const response = await updateUser(user.uid,fixedFormData);
      if (response.success) {
        navigate("/userview");
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error adding user");
    }
  };
  return (
    <div className='m-4'>
      <form className='h-screen' onSubmit={handleFormSubmit}>
        <div className='flex justify-center items-center'><Button variant="secondary">Update Your Profile</Button></div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 m-4 p-4 ">
              <InputField label="First Name" name="firstName" value={formData?.firstName} onChange={handleInputChange} />
              <InputField label="Last Name" name="lastName" value={formData?.lastName} onChange={handleInputChange} />
              <InputField label="Email" type="email" name="email" value={formData?.email} disabled={true} onChange={handleInputChange} />
              <InputField label="Phone Number" name="phoneNumber" value={formData?.phoneNumber} onChange={handleInputChange} />
              <InputField label="Date of Birth" type="date" name="dob" value={formData?.dob} onChange={handleInputChange} />
              <InputField label="Designation" name="designation" value={formData?.designation} onChange={handleInputChange} />
              <InputField label="Joining Date" type="date" name="joiningDate" value={formData?.joiningDate} onChange={handleInputChange} />
            </div>
            <div className="mx-4 p-4"><TextareaField label="Address" name="address" value={formData?.address} onChange={handleInputChange} /></div>
            <div className='flex justify-center gap-2 items-center'>
                <Button onClick={handleFormSubmit}>Save</Button>
                <Button onClick={()=>{console.log("update cancelled")}} variant='secondary'>Cancel</Button>
            </div>
      </form>
    </div>
  );
};

export default UpdateUserInfo;
