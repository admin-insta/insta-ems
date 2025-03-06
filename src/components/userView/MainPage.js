import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import SideBar from "./SideBar";

const MainPage = () => {
  
  return (
    <>
      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <div className="col-span-2">
          <SideBar />
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
