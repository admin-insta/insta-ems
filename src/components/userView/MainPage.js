import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { deleteCookie } from "../../cookieStorage/cookie";
import { removeUser } from "../store/userSlice";
import Header from "../Header";
import SideBar from "./SideBar";

const MainPage = () => {
  const userData = useSelector((store) => store?.user);
  const [user, setUser] = useState(userData);
  const { name } = user || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    deleteCookie("authToken"); // Remove the cookie on logout
    setUser(null); // Reset local user state
    dispatch(removeUser()); // Clear Redux store user data
    navigate("/"); // Redirect to home page
  };

  return (
    <>
     
      <div className="h-screen bg-clay-light grid grid-cols-12">
        {/* Sidebar */}
        <div className="col-span-2">
          <SideBar name={name} handleSignOut={handleSignOut} />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-10 md:col-span-9 sm:col-span-8">
          <div className="sticky top-0 z-10">
            <Header />
          </div>
          <div className="p-4 overflow-y-scroll">
            <Outlet /> {/* Dynamically renders content here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
