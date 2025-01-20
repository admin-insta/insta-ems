import React from "react";
import { Dropdown } from "rsuite";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
const PaySlip = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 m-4 h-screen">
        {/* Employee List Section */}
        <div className="col-span-3 p-4 bg-clay shadow-md rounded-md  ">
          <h2 className="text-lg font-bold">Employee List</h2>
          <ul className="mt-2">
            <li className="p-2 bg-white rounded-sm m-1 text-base">Employee</li>
          </ul>
        </div>

        <div className="col-span-9 flex flex-col p-2 shadow-md">
          <div className="flex justify-around p-4">
            <div className="flex ">
              <div>PaySlip / </div>
              <div> Reimbursement</div>
            </div>

            <div>
              <Dropdown title="Select Month"></Dropdown>
              <span className="mx-2">
                <button className="bg-clay px-6 rounded-sm py-1">
                  <FileDownloadOutlinedIcon />
                </button>
              </span>
            </div>
          </div>
          <div className="flex flex-row  font-semibold text-base text-gray-700 ">
            <div className="w-1/2 border shadow-md  bg-white m-2">
              <p className="p-2 border-b">Earnings</p>
              <div className="p-2 bg-gray-200">
                <span className="px-2 flex justify-end">Amounts in (₹)</span>
              </div>
              <div className="p-2 ">BASIC</div>
              <div className="p-2 ">HRA</div>
              <div className="p-2 ">SPECIAL ALLOWANCE</div>
              <div className="p-2 bg-gray-200">Total -</div>
            </div>
            <div className="w-1/2 border shadow-md font-poppins m-2 bg-white">
              <p className="p-2 border-b">Deductions</p>
              <div className="p-2 bg-gray-200">
                <span className="px-2 flex justify-end">Amounts in (₹)</span>
              </div>
              <div className="p-2 ">Professional TAx</div>
              <div className="p-2 ">Income Tax</div>
              <div className="p-2 ">Total Duductions-</div>
              <div className="p-2 bg-clay">Net Pay-</div>
            </div>
          </div>

          <div className="m-2 p-4  border shadow-md  bg-future text-base">
            <p className="p-1 font-semibold">Employee Details</p>
            <div className="flex justify-between">
              <div className="p-1">Name- Ashish Kumar</div>
              <div className="p-1">Joining Date - 01-01-2025</div>
            </div>
            <div className="flex justify-between">
              <div className="p-1">Bank Name- Axis Bank</div>
              <div className="p-1">Bank Account Number- 810552237XXXXX</div>
            </div>

            <div className="p-1">PF Number- UTIB004536 </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaySlip;
