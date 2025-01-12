import React, { useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { addPeople } from "../../store/peopleSlice";

const ManagePeople = () => {
  const people = useSelector((store) => store.people); // Get the current list of people from Redux store
  const dispatch = useDispatch(); // Dispatch function to update the Redux store
  console.log("people:", people);
  const [open, setOpen] = useState(false);

  // Create refs for each input field
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef();
  const dobRef = useRef();
  const designationRef = useRef();
  const joiningDateRef = useRef();
  const addressRef = useRef();

  // Add employee
  const handleAddEmployee = (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    const newPerson = {
      id: Date.now(), // Unique ID for each person
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      contact: contactRef.current.value,
      dob: dobRef.current.value,
      designation: designationRef.current.value,
      joiningDate: joiningDateRef.current.value,
      address: addressRef.current.value,
    };

    // Check if all fields are filled
    if (
      newPerson.firstName &&
      newPerson.lastName &&
      newPerson.email &&
      newPerson.contact &&
      newPerson.dob &&
      newPerson.designation &&
      newPerson.joiningDate &&
      newPerson.address
    ) {
      dispatch(addPeople([...people, newPerson])); // Update Redux store

      // Reset all input fields
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      emailRef.current.value = "";
      contactRef.current.value = "";
      dobRef.current.value = "";
      designationRef.current.value = "";
      joiningDateRef.current.value = "";
      addressRef.current.value = "";
      // Close the dialog
      //   setOpen(false);
    } else {
      alert("Please fill out all fields.");
    }
    console.log("people info from store is:", people);
  };
  console.log("people info from store is:", people);

  return (
    <>
      <div>
        <h1>Manage Employees</h1>
        <button onClick={() => setOpen(true)} className="bg-gray-300 m-2 p-2">
          Add People to your organisation
        </button>
        <div>
          <h1>Employee List</h1>
          {people.map((people, index) => (
            <div key={index}>
              {people.firstName} {people.lastName}
            </div>
          ))}
        </div>
      </div>
      {/*add employee form*/}
      <div className="flex m-4 p-4">
        <div className="">
          <Dialog open={open}>
            <div className="m-2 p-2 font-semibold flex justify-center">
              <h1 className="px-8 py-2 bg-red-600 rounded-md text-white">
                Employee Details
              </h1>
            </div>
            <form className="m-2 border shadow-md" onSubmit={handleAddEmployee}>
              <div className="flex justify-between">
                <div className="m-2">
                  <label className="text-xs text-blue-600 p-1">
                    Enter First Name
                  </label>
                  <div>
                    <input
                      className="border p-1 m-1 shadow-inner w-64"
                      type="text"
                      ref={firstNameRef}
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="m-2">
                  <label className="text-xs text-blue-600 p-1">
                    Enter Last Name
                  </label>
                  <div>
                    <input
                      className="border p-1 m-1 shadow-inner w-64"
                      type="text"
                      ref={lastNameRef}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="m-2">
                  <label className="text-xs text-blue-600 p-1">
                    Enter The Email Id
                  </label>
                  <div>
                    <input
                      className="border p-1 m-1 shadow-inner w-64"
                      type="email"
                      ref={emailRef}
                      placeholder="Email Id"
                    />
                  </div>
                </div>
                <div className="m-2">
                  <label className="text-xs text-blue-600 p-1">
                    Enter Contact Details
                  </label>
                  <div>
                    <input
                      className="border p-1 m-1 shadow-inner w-64"
                      type="text"
                      ref={contactRef}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="m-2">
                  <label className="text-xs text-blue-600 p-1">
                    Enter Date Of Birth
                  </label>
                  <div>
                    <input
                      className="border p-1 m-1 shadow-inner w-64"
                      type="date"
                      ref={dobRef}
                      placeholder="Date of Birth"
                    />
                  </div>
                </div>

                <div className="m-2">
                  <label className="text-xs text-blue-600 p-1">
                    Designation
                  </label>
                  <div>
                    <input
                      className="border p-1 m-1 shadow-inner w-64"
                      type="text"
                      ref={designationRef}
                      placeholder="Enter Designation"
                    />
                  </div>
                </div>
              </div>

              <div className="m-2">
                <label className="text-xs text-blue-600 p-1">
                  Enter Date Of Joining
                </label>
                <div>
                  <input
                    className="border p-1 m-1 shadow-inner w-64"
                    type="date"
                    ref={joiningDateRef}
                    placeholder="Joining Date"
                  />
                </div>
              </div>

              <div className="m-2">
                <label className="text-xs text-blue-600 p-1">
                  Enter Address
                </label>
                <div>
                  <textarea
                    className="border p-1 m-1 shadow-inner w-full"
                    ref={addressRef}
                    placeholder="Address"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="m-2 p-2 bg-red-600 text-white rounded-md"
                >
                  Submit
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
        </div>
      </div>
    </>
  );
};

export default ManagePeople;
