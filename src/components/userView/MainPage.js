import React, { useState } from "react";
import userviewHome from "../utils/images/userviewHome.jpg";
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
const MainPage = () => {
  
  const [people, setPeople] = useState(false);
  const user = useSelector((store) => store?.user);
  console.log("user is:", user);
  const { name, photoUrl } = user || {};
  console.log("name is ", name);
  return (
    <div className="bg-gray-100  h-screen grid grid-flow-col cols=-span-12">
      {/*Taskbar-Content*/}
      <div className=" p-2 col-span-1 bg-clay shadow-lg text-gray-800 h-screen overflow-y-scroll " style={{ scrollbarWidth: "thin" }}>
        <div className=" font-semibold text-base flex  items-center">
          {name}
          <img className="h-12 m-2 rounded-full" alt="/" src={photoUrl} />
        </div>

        <ul className="mt-8 ">
          <li className="m-1 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white">
            <HomeOutlinedIcon sx={{ fontSize: 24 }} />
            <span className="mx-2">Home</span>
          </li>
          <li onClick={()=>setPeople(!people)} className="m-1 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white">
            <PeopleAltIcon />
            <span className="mx-2">People</span>
          </li>
          <li className="m-1 hover:scale-105 transition-all ease-in-outrounded-md hover:bg-white">
            <CalendarMonthIcon />
            <span className="mx-2">Attendance</span>
          </li>
          <li className="m-1 hover:scale-105 transition-all ease-in-outrounded-md hover:bg-white">
            <EventBusyIcon />
            <span className="mx-2">Leave</span>
          </li>
          <li className="m-1 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white">
            <CurrencyRupeeIcon />
            <span className="mx-2">Salary</span>
          </li>
          <li className="m-1 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white">
            <ArticleIcon />
            <span className="mx-2">Document center</span>
          </li>
          <li className="m-1 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white">
            <MoneyIcon />
            <span className="mx-2">Expense Claims</span>
          </li>
          <li className="m-1 hover:scale-105 transition-all ease-in-out rounded-md hover:bg-white">
            <PrivacyTipOutlinedIcon />
            <span className="mx-2">Help Desk</span>
          </li>
        </ul>
      </div>
      {/*Body-Content*/}
      <div className="col-span-11">
        <div className="text-2xl text-gray-600 p-4 ">Good Evening</div>
        {people && <People/>}
      </div>
    </div>
  );
};

export default MainPage;
