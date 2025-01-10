import React, { useState } from "react";
import { useSelector } from "react-redux";
import HomeOutlinedIcon from "@mui/icons-material/Home";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ArticleIcon from "@mui/icons-material/Article";
import MoneyIcon from "@mui/icons-material/Money";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTip";
import People from "./people/People";
import AttendanceInfo from "./attendance/AttendanceInfo";

const MainPage = () => {
  const [selectedTask, setSelectedTask] = useState(null); // Tracks the currently selected task
  const user = useSelector((store) => store?.user);
  const { name, photoUrl } = user || {};

  return (
    <div className="bg-gray-100 h-screen grid grid-flow-col cols-span-12">
      {/* Sidebar */}
      <div
        className="pl-2 col-span-1 bg-clay shadow-lg text-gray-800 h-screen overflow-y-scroll"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="font-semibold text-base flex items-center">
          {name}
          <img className="h-12 m-2 rounded-full" alt="/" src={photoUrl} />
        </div>

        <ul className="mt-8">
          <li
            onClick={() => setSelectedTask("home")}
            className="m-2 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <HomeOutlinedIcon sx={{ fontSize: 24 }} />
            <span className="mx-2">Home</span>
          </li>
          <li
            onClick={() => setSelectedTask("people")}
            className="m-2 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <PeopleAltIcon />
            <span className="mx-2">People</span>
          </li>
          <li
            onClick={() => setSelectedTask("attendance")}
            className="m-2 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <CalendarMonthIcon />
            <span className="mx-2">Attendance</span>
          </li>
          <li
            onClick={() => setSelectedTask("leave")}
            className="m-2 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <EventBusyIcon />
            <span className="mx-2">Leave</span>
          </li>
          <li
            onClick={() => setSelectedTask("salary")}
            className="m-2 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <CurrencyRupeeIcon />
            <span className="mx-2">Salary</span>
          </li>
          <li
            onClick={() => setSelectedTask("documents")}
            className="m-2 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <ArticleIcon />
            <span className="mx-2">Document Center</span>
          </li>
          <li
            onClick={() => setSelectedTask("expenses")}
            className="m-2 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <MoneyIcon />
            <span className="mx-2">Expense Claims</span>
          </li>
          <li
            onClick={() => setSelectedTask("help")}
            className="m-2 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <PrivacyTipOutlinedIcon />
            <span className="mx-2">Help Desk</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="col-span-11">
        {selectedTask === "home" && (
          <div className="text-2xl text-gray-600 p-4">Good Evening</div>
        )}
        {selectedTask === "people" && <People />}
        {selectedTask === "attendance" && <AttendanceInfo />}
        {selectedTask === "home" && <div>Welcome to the Home Page!</div>}
        {selectedTask === "leave" && <div>Leave Management</div>}
        {selectedTask === "salary" && <div>Salary Information</div>}
        {selectedTask === "documents" && <div>Document Center</div>}
        {selectedTask === "expenses" && <div>Expense Claims</div>}
        {selectedTask === "help" && <div>Help Desk</div>}
      </div>
    </div>
  );
};

export default MainPage;
