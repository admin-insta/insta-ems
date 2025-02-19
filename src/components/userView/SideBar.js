import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoneyIcon from "@mui/icons-material/Money";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTipOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

const SideBar = ({ name }) => {
  return (
    <div className="lg:col-span-2 md:col-span-3 sm:col-span-4 bg-clay shadow-lg text-gray-800 h-screen overflow-y-scroll">
      {/* User Profile */}
      <div className="font-semibold text-sm flex items-center p-4">
        {name}
        <img
          className="h-10 m-2 rounded-full"
          alt="Profile"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        />
       
      </div>

      {/* Sidebar Navigation */}
      <ul className="mt-2">
        {[
          { to: "/userview/userHome", icon: <HomeIcon />, label: "Home" },
          { to: "/userview/employeeInfo", icon: <PeopleAltOutlinedIcon />, label: "Employee Info" },
          { to: "/userview/AttendanceInfo", icon: <CalendarMonthIcon />, label: "Attendance Info" },
          { to: "/userview/leaveManagement", icon: <EventBusyIcon />, label: "Leave Management" },
          { to: "/userview/salaryInfo", icon: <CurrencyRupeeIcon />, label: "Salary" },
          { to: "/userview/documentCenter", icon: <ArticleOutlinedIcon />, label: "Documents Center" },
          { to: "/userview/expenseClaim", icon: <MoneyIcon />, label: "Expense Claims" },
          { to: "/userview/helpDesk", icon: <PrivacyTipIcon />, label: "Help Desk" },
          { to: "/userview/feedback", icon: <ThumbUpAltOutlinedIcon />, label: "Feedback" },
        ].map(({ to, icon, label }) => (
          <li key={to} className="m-2">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center w-full p-2 rounded-md transition-all ease-in-out text-black ${
                  isActive ? "bg-white text-black shadow-md" : "text-black hover:text-black hover:bg-gray-100"
                }`
              }
              style={{ textDecoration: "none" }} // Ensures no underline even if Tailwind fails
            >
              {icon}
              <span className="mx-2">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
