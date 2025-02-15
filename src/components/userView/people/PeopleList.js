import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmployeeList from "../EmployeeList";
import Card from "../../utils/theme/Cards";
import SettingsAccessibilityOutlinedIcon from '@mui/icons-material/SettingsAccessibilityOutlined';
import { fetchUsers } from "../../../api/users";
import { addPeople } from "../../store/peopleSlice";

const People = () => {
  const dispatch = useDispatch();
  const people = useSelector((store) => store.people || []);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const result = await fetchUsers();
      if (result.success) {
        result.users.forEach(user => dispatch(addPeople(user)));
      } else {
        console.error(result.message);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (people.length > 0 && !selectedEmployee) {
      setSelectedEmployee(people[0]);
    }
  }, [people, selectedEmployee]);

  return people.length === 0 ? (
    <div className="m-4 gap-4">
      There are no employees in your organisation, Add Employee
    </div>
  ) : (
    <div className="gap-2 grid grid-cols-12 h-screen">
      {/* Scrollable Employee List */}
      <div className="col-span-3">
        <EmployeeList onSelectEmployee={setSelectedEmployee} />
      </div>

      {/* Description Box */}
      <div className="col-span-9">
        <Card
          variant="secondary"
          fullScreen="true"
          title={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <SettingsAccessibilityOutlinedIcon /> Employee Information
            </span>
          }
          description={
            <div className="p-4">
              {selectedEmployee ? (
                <div className="bg-clay-light p-4 border border-clay rounded-md">
                  <p>
                    <AccountCircleIcon sx={{ fontSize: 72, color: "blue" }} />
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedEmployee.firstName}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedEmployee.contact}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {selectedEmployee.dob}
                  </p>
                  <p>
                    <strong>Designation:</strong> {selectedEmployee.designation}
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedEmployee.address}
                  </p>
                  <p>
                    <strong>Date of Joining:</strong>{" "}
                    {selectedEmployee.joiningDate}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No employee found.</p>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default People;
