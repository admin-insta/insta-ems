import React, { useState } from "react";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoneyIcon from "@mui/icons-material/Money";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTipOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import PeopleList from "./people/PeopleList";
import ManagePeople from "./people/ManagePeople";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import UserHome from "./UserHome";
import Attendance from "./attendance/Attendance";
import LeaveManagement from "./leave/LeaveManagement";
import PaySlip from "./salary/PaySlip";
import Feedback from "./feedback/Feedback";
import DocumentCenter from "./document/DocumentCenter";

const MainPage = () => {
  const [selectedTask, setSelectedTask] = useState("home"); // Tracks the currently selected task
  const user = useSelector((store) => store?.user);
  const { name, photoUrl } = user || {};
  const [showPeople, setShowPeople] = useState(false);
  const [showPayslip, setShowPayslip] = useState(false);

  return (
    <div className="bg-clay-light h-screen grid grid-cols-12">
      {/* Sidebar */}
      <div
        className="col-span-2 bg-clay shadow-lg text-gray-800 h-screen overflow-y-scroll"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="font-semibold text-sm flex items-center p-4">
          {name}
          <img className="h-10 m-2 rounded-full" alt="/" src={photoUrl} />
        </div>

        <ul className="mt-4 ">
          <li
            onClick={() => setSelectedTask("home")}
            className="m-2 flex items-center hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <HomeIcon sx={{ fontSize: 24 }} />
            <span className="mx-2">Home</span>
          </li>
          <li className="m-2 flex items-center hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer">
            <PeopleAltOutlinedIcon />
            <span
              onClick={() => setShowPeople(!showPeople)}
              className="mx-2 flex items-center"
            >
              People <KeyboardArrowDownIcon />
            </span>
          </li>

          {showPeople && (
            <>
              <p
                onClick={() => setSelectedTask("people")}
                className="ml-6 p-1 text-sm hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
              >
                <ManageSearchIcon /> Employees List
              </p>
              <p
                onClick={() => setSelectedTask("managepeople")}
                className="ml-6 p-1 text-sm hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
              >
                <BadgeOutlinedIcon /> Manage Employees
              </p>
            </>
          )}

          <li
            onClick={() => setSelectedTask("attendance")}
            className="m-2 flex items-center hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <CalendarMonthIcon />
            <span className="mx-2">Attendance</span>
          </li>

          <li
            onClick={() => setSelectedTask("leave")}
            className="m-2 flex items-center hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <EventBusyIcon />
            <span className="mx-2">Leave</span>
          </li>

          <li
            onClick={() => setShowPayslip(!showPayslip)}
            className="m-2 flex items-center hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <CurrencyRupeeIcon />
            <span className="mx-2">Salary <KeyboardArrowDownIcon /></span>
          </li>
          {showPayslip && (
            <p
              onClick={() => setSelectedTask("payslip")}
              className="ml-6 p-1 text-sm hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
            >
              <AccountBalanceWalletOutlinedIcon /> Payslip
            </p>
          )}

          <li
            onClick={() => setSelectedTask("documents")}
            className="m-2 flex items-center hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <ArticleOutlinedIcon />
            <span className="mx-2">Documents</span>
          </li>
          <li
            onClick={() => setSelectedTask("expenses")}
            className="m-2 flex items-center hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <MoneyIcon />
            <span className="mx-2">Expense Claims</span>
          </li>
          <li
            onClick={() => setSelectedTask("help")}
            className="m-2 flex items-center hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <PrivacyTipIcon />
            <span className="mx-2">Help Desk</span>
          </li>
          <li
            onClick={() => setSelectedTask("feedback")}
            className="m-2 flex items-center hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white cursor-pointer"
          >
            <ThumbUpAltOutlinedIcon />
            <span className="mx-2"> Feedback</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="col-span-10">
        {selectedTask === "home" && (
          <div className="text-2xl text-gray-600 p-4">
            <UserHome />
          </div>
        )}
        {selectedTask === "people" && <PeopleList />}
        {selectedTask === "managepeople" && <ManagePeople />}
        {selectedTask === "attendance" && <Attendance />}
        {selectedTask === "leave" && <LeaveManagement />}
        {selectedTask === "payslip" && <PaySlip />}
        {selectedTask === "documents" && <DocumentCenter />}
        {selectedTask === "expenses" && <div>Expense Claims</div>}
        {selectedTask === "help" && <div>Help Desk</div>}
        {selectedTask === "feedback" && <Feedback />}
      </div>
    </div>
  );
};

export default MainPage;
