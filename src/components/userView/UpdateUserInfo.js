import React, { useState } from 'react'
import InputField from '../utils/theme/InputField'
import Button from '../utils/theme/Button';
import { addUser } from '../../api/users';

const UpdateUserInfo = () => {
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
        
       } else {
         console.error(response.message); 
       }
     }catch(error){
       console.error("Error adding user")
     }  
   
   };     
  return (
    <div className='m-4'>
      <form className='h-screen' onSubmit={handleFormSubmit}>
        <h4 className='flex justify-center items-center'>Update Your Profile</h4>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 m-4 p-4 ">
              <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
              <InputField label="Contact" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
              <InputField label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
              <InputField label="Designation" name="designation" value={formData.designation} onChange={handleInputChange} />
              <InputField label="Joining Date" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} />
            </div>
            <div className='flex justify-center gap-2 items-center'>
                <Button onClick={handleFormSubmit}>Save</Button>
                <Button onClick={()=>{console.log("update cancelled")}} variant='secondary'>Cancel</Button>
            </div>
      </form>
    </div>
  )
}

export default UpdateUserInfo
