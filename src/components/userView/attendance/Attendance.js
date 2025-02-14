import React, { useEffect, useState } from "react";
import AttendanceInfo from "./AttendanceInfo";
import { mockAttendance } from "../../utils/mockAttendance";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import EmployeeList from "../EmployeeList";
import { useSelector } from "react-redux";
import Card from "../../utils/theme/Cards";

const Attendance = () => {
  const [view, setView] = useState("grid"); // Default view is grid
  const people = useSelector((store) => store.people || []);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (people.length > 0 && !selectedEmployee) {
      setSelectedEmployee(people[0]);
    }
  }, [people, selectedEmployee]);
  const toggleView = (viewType) => {
    setView(viewType);
  };

  return (
    <div className="grid grid-cols-12 gap-2  h-screen">
      {/* Employee List Section */}
      <div className="col-span-3  bg-clay-light ">
        <EmployeeList onSelectEmployee={setSelectedEmployee} />
      </div>

      {/* Attendance Info Section */}
      <div className="col-span-9 overflow-y-scroll ">
        <Card
          variant="secondary"
          description={
            <div className="">
              <div className="flex flex-col">
                <div className="text-center text-lg font-semibold mb-4 flex justify-between m-4">
                  <span>Attendance of - {mockAttendance.name}</span>
                  <span className="flex gap-2">
                    <GridViewIcon
                      onClick={() => toggleView("grid")}
                      className={`cursor-pointer ${
                        view === "grid" ? "text-black" : "text-white"
                      }`}
                    />
                    <ListAltOutlinedIcon
                      onClick={() => toggleView("list")}
                      className={`cursor-pointer ${
                        view === "list" ? "text-black" : "text-gray-200"
                      }`}
                    />
                  </span>
                </div>

                {/* Render content based on view */}
                <div className="w-full justify-start">
                  <AttendanceInfo view={view} />
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Attendance;
