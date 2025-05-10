import React, { useEffect, useState } from "react";
import AttendanceInfo from "./AttendanceInfo";
import { mockAttendance } from "../../utils/mockAttendance";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import EmployeeList from "../EmployeeList";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../utils/theme/Cards";
import { setSelectedEmployee } from "../../store/employeeSlice";
const Attendance = () => {
  const dispatch= useDispatch()
  const [view, setView] = useState("grid"); // Default view is grid
  const employee = useSelector((store) => store.employee || []);
  const selectedEmployee = useSelector((store)=>store?.employee?.selectedEmployee)
 

  useEffect(() => {
    if (employee.length > 0 && !selectedEmployee) {
      dispatch(setSelectedEmployee(employee[0]));
    }
  }, [employee, selectedEmployee]);
  const toggleView = (viewType) => {
    setView(viewType);
  };

  return (
    <div className="grid grid-cols-12 gap-2  h-screen">
      {/* Employee List Section */}
      <div className="col-span-3  bg-clay-light ">
        <EmployeeList />
      </div>

      {/* Attendance Info Section */}
      <div className="col-span-9 overflow-y-scroll ">
        <Card
          variant="primary"
          description={
            <div className="">
              <div className="flex flex-col">
                <div className="text-center text-lg font-semibold mb-2 mx-2 flex justify-between ">

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
                <div className=" grid grid-flow-col grid-cols-8 gap-2 mb-2 mx-2">
                  <div className="h-24  bg-white col-span-2 p-2  rounded-sm">Day Reviews</div>
                  <div className="h-24  bg-white col-span-2 p-2  rounded-sm">Total Working Days</div>
                  <div className="h-24  bg-white col-span-2  p-2  rounded-sm">Present Days</div>
                  <div className="h-24  bg-white col-span-2  p-2  rounded-sm">Penality Days</div>

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
