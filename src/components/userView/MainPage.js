import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import SideBar from "./SideBar";
import { fetchUsers } from "../../api/users";
import { setEmployees, setPagination } from "../store/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../store/employeeSlice";

const MainPage = () => { 
  const dispatch = useDispatch();
  const employee = useSelector((store) => store?.state?.employee || []);
  useEffect(() => {
    const getUsers = async () => {
      if (employee.length > 0) return;
  
      const result = await fetchUsers(1, 10); // page 1, 10 per page
      console.log("results",result);
      if (result.success) {
        dispatch(setEmployees(result.employees));
        dispatch(setPagination({
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalEmployees: result.totalEmployees,
        }));
      } else {
        console.error(result.message);
      }
    };
    getUsers();
  }, [dispatch, employee.length]);
  return (
    <>
      <div className="grid grid-cols-11">
        {/* Sidebar */}
        <div className="col-span-1">
          <SideBar />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-10 md:col-span-9 sm:col-span-8">
          <div className="sticky top-0 z-10">
            <Header />
          </div>
          <div className="p-2 overflow-y-scroll">
            <Outlet /> {/* Dynamically renders content here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
