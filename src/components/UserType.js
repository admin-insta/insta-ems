import React from "react";
import UserManager from "./UserManager";

const UserType = () => {
  return (
    <>
    <div className=" m-4 p-10 flex flex-col justify-center items-center">
      <div className="text-6xl font-bold text-gray-700">
        Manager, Owner, Employee?
        
      </div>
      <div className=" text-3xl font-semibold text-gray-800 m-4 p-2">
        Simplifying Work for Everyone, At Every level.
      </div>
    </div>
    <UserManager/>
    </>
  );
};

export default UserType;
