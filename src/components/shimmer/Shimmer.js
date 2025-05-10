import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Shimmer = () => {
  return (
    <div className="grid grid-cols-11 gap-4 p-4">
      {/* Sidebar Placeholder */}
      <div className="col-span-1 hidden sm:flex flex-col items-center bg-gray-100 h-screen rounded-md shadow-md p-2">
        <div className="flex flex-col items-center p-4 w-full">
          <div className="bg-gray-300 rounded-full p-2 animate-pulse">
            <AccountCircleIcon className="text-4xl text-gray-400" />
          </div>
          <div className="h-4 w-16 bg-gray-300 rounded mt-2 animate-pulse"></div>
        </div>

        <ul className="w-full mt-4 flex-1">
          {[...Array(9)].map((_, index) => (
            <li key={index} className="flex justify-center mb-4">
              <div className="w-4/5 h-10 bg-gray-300 animate-pulse rounded-md"></div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Placeholder */}
      <div className="col-span-10 flex flex-col gap-4">
        {/* Top Bar Placeholder */}
        <div className="h-16 bg-gray-300 animate-pulse rounded-md m-2"></div>

        {/* Cards / Stats Placeholder */}
        <div className="flex flex-row gap-4 m-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex-1 h-40 bg-gray-300 animate-pulse rounded-md"></div>
          ))}
        </div>

        {/* Main Section Placeholder */}
        <div className="flex-1 bg-gray-300 animate-pulse rounded-md m-2 h-[400px]"></div>
      </div>
    </div>
  );
};

export default Shimmer;
