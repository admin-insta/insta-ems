import React from "react";
import docCenter from "../../utils/images/docCenter.png";
import EmployeeList from "../EmployeeList";
const DocumentCenter = () => {
  return (
    <div className="grid grid-cols-12 gap-4 h-screen">
      {/* Employee List Section */}
      <div className="col-span-3 ">
        <EmployeeList />
      </div>
      <div className="col-span-9 p-4 bg-white shadow-md rounded-md overflow-y-scroll">
        <div className="flex justify-between ">
          <div>
            <h6>We've got it sorted for you!</h6>
            <p className="text-sm">All Documents are now in one place..</p>
            <p className="text-sm">
              You can now request a new letter if you don't find the one you
              were looking for..
            </p>
          </div>
          <div>
            <img className="h-16" alt="my-docs" src={docCenter} />
          </div>
        </div>

        <div className="my-10 mx-8 flex justify-between text-sm">
          <div className="m-1 p-2 bg-white shadow-md w-full">Documents</div>
          <div className="m-1 p-2 bg-white shadow-md w-full">Payslips</div>
          <div className="m-1 p-2 bg-white shadow-md w-full">Form 16</div>
          <div className="m-1 p-2 bg-white shadow-md w-full">
            Company Policy
          </div>
          <div className=" m-1 p-2 bg-white shadow-md w-full">Letter Forms</div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCenter;
