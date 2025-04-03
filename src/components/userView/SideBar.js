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
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const SideBar = ({ name }) => {
  
  const user = useSelector((store)=>store?.user)
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if(user?.firstLogin){
  //     console.log("First Login");
  //     navigate("/userview/updateUser", { replace: true });
  //   }
  // }
  // , [user?.firstLogin]);
  return (
    <div className="bg-clay shadow-lg text-gray-800 h-screen fixed overflow-y-auto flex flex-col items-center p-1">
      {/* User Profile */}
      <div className="flex flex-col items-center p-4">
        <AccountCircleIcon className="text-4xl" />
        <span className="text-xs mt-1 text-center">{user?.name || ""}</span>
      </div>

      {/* Sidebar Navigation */}
      <ul className="mt-4 w-full flex-1">
        {[
          { to: "/userview/userHome", icon: <HomeIcon />, label: "Home" },
          { to: "/userview/employeeInfo", icon: <PeopleAltOutlinedIcon />, label: "Employees" },
          { to: "/userview/AttendanceInfo", icon: <CalendarMonthIcon />, label: "Attendance" },
          { to: "/userview/leave", icon: <EventBusyIcon />, label: "Leaves" },
          { to: "/userview/salaryInfo", icon: <CurrencyRupeeIcon />, label: "Salary" },
          { to: "/userview/documentCenter", icon: <ArticleOutlinedIcon />, label: "Documents" },
          { to: "/userview/expenseClaim", icon: <MoneyIcon />, label: "Expenses" },
          { to: "/userview/helpDesk", icon: <PrivacyTipIcon />, label: "Help" },
          { to: "/userview/feedback", icon: <ThumbUpAltOutlinedIcon />, label: "Feedback" },
        ].map(({ to, icon, label }) => (
          <li key={to} className="mb-4 flex justify-center">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center w-full p-2 rounded-md transition-all ease-in-out text-black text-xs text-center ${
                  isActive ? "bg-white text-black shadow-md" : "text-black hover:text-black hover:bg-gray-100"
                }`
              }
              style={{ textDecoration: "none" }}
            >
              {React.cloneElement(icon, { className: "text-3xl" })}
              <span className="mt-1">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;