import React from "react";
import UserManager from "./UserManager";

const UserType = () => {
  return (
    <>
      <div className=" m-4 lg:p-10 md:p-6 sm:p-2 grid justify-center items-center">
        <div className="lg:text-6xl md:text-4xl sm:text-3xl font-bold text-gray-700">
          Manager, Owner, Employee?
        </div>
        <div className=" lg:text-3xl md:text-xl sm:text-base font-semibold text-gray-800 lg:my-4 md:my-2 sm:my-1 text-center">
          Simplifying Work for Everyone, At Every level.
        </div>
      </div>
      <UserManager />
    </>
  );
};

export default UserType;
