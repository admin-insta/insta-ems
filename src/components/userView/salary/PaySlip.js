import React, { useEffect, useState } from "react";
import Button from "../../utils/theme/Button";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../utils/theme/Cards";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import { setSelectedEmployee } from "../../store/employeeSlice";
import Men_Dummy from "../../utils/images/Men_Dummy.jpg";
import Women_Dummy from "../../utils/images/Wommen_Dummy.jpg";
const PaySlip = () => {
  const dispatch = useDispatch();
  const employee = useSelector((store) => store.employee || []);
  const selectedEmployee = useSelector(
    (store) => store?.employee?.selectedEmployee
  );
  const selectedSalary = useSelector((store) => store?.salary?.selectedSalary);

  useEffect(() => {
    if (employee.length > 0 && !selectedEmployee) {
      dispatch(setSelectedEmployee(employee[0])); // Set the first employee
    }
  }, [employee, selectedEmployee]); // Add selectedEmployee as a dependency
  console.log(selectedEmployee);
  return (
    <div className="grid grid-cols-12 gap-2 h-screen border-gray-300 bg-clay-light ">
      <div className="col-span-12 ">
        <Card
          variant="primary"
          fullScreen="true"
          title={
            <div className="flex justify-between mr-4 font-normal">
              <div className="flex items-center gap-2">
                <CurrencyBitcoinOutlinedIcon /> Salary Information
              </div>
              <div className="text-sm font-normal">
                <Button variant="primary">Download</Button>
              </div>
            </div>
          }
          description={
            <div className="flex flex-col p-2 shadow-md ">
              {/*profile*/}
              <div className="mx-2 gap-2 grid grid-cols-12 p-2 bg-[#f2ebd2] rounded-md shadow-md">
                {/* Employee Icon & Email */}
                <div className="col-span-5 flex flex-col items-start min-w-0">
                  <div className="text-8xl">
                    <img
                      className="h-32"
                      alt="profile-pic"
                      src={Men_Dummy}
                    />
                  </div>
                  <div className="text-xs border-b">
                    EMAIL ID: {selectedEmployee?.email}
                  </div>
                  <div className="text-xs">Reporting Manager:</div>
                </div>

                {/* Name & Designation */}
                <div className="col-span-3 flex flex-col  min-w-0">
                  <div className="border-b whitespace-nowrap">
                    {selectedEmployee?.name || "Ashish Kumar"}
                  </div>
                  <div className="border-b whitespace-nowrap">
                    {selectedEmployee?.designation || "Software Developer"}
                  </div>
                </div>

                {/* Pay Salary Button */}
                <div className="col-span-4 flex flex-col justify-between text-sm">
                  <div className="border-b">Net Earning-</div>
                  <div className="border-b">Net Deductions-</div>
                  <div className="border-b">Net Pay-</div>
                </div>
              </div>

              {/*Payslip Details Section*/}
              <div className="flex flex-row my-2 ">
                <div className="w-1/2 border shadow-md rounded-md  bg-[#f2ebd2] m-2">
                  <p className="p-2 border-b">Earnings</p>
                  <div className="p-2 bg-gray-200">
                    <span className="px-2 flex justify-end">
                      Amounts in (₹)
                    </span>
                  </div>
                  <div>
                    <div className="p-2 border-b border-white ">
                      BASIC - {selectedSalary.salaryStructure?.basic}
                    </div>
                    <div className="p-2 border-b border-white ">
                      HRA -{selectedSalary.salaryStructure?.hra}
                    </div>
                    <div className="p-2 border-b border-white">
                      SPECIAL ALLOWANCE{" "}
                      {selectedSalary.salaryStructure?.specialAllowance}
                    </div>
                  </div>

                  <div className="p-2 bg-white">Total -</div>
                </div>
                <div className="w-1/2 border shadow-md font-poppins rounded-md m-2 bg-[#f2ebd2]">
                  <p className="p-2 border-b">Deductions</p>
                  <div className="p-2 bg-gray-200">
                    <span className="px-2 flex justify-end">
                      Amounts in (₹)
                    </span>
                  </div>
                  <div className="p-2 border-b border-white">
                    Professional Tax -{" "}
                    {selectedSalary.salaryStructure?.professionalTax}
                  </div>
                  <div className="p-2 border-b border-white">
                    Income Tax - {selectedSalary.salaryStructure?.incomeTax}
                  </div>
                  <div className="p-2 border-b border-white">
                    Total Duductions-
                  </div>
                  <div className="p-2 bg-white">Net Pay-</div>
                </div>
              </div>

              {/*Employee bak Deatils Section*/}
              {/* <div className="mb-2  mx-2 p-1 border shadow-md  bg-[#f2ebd2] rounded-md">
                <p className="p-1 font-semibold border-b border-white">
                  Employee Details
                </p>
                <div className="flex justify-between border-b border-white">
                  <div className="p-1 ">Name- Ashish Kumar</div>
                  <div className="p-1">Joining Date - 01-01-2025</div>
                </div>
                <div className="flex justify-between border-b border-white">
                  <div className="p-1">Bank Name- Axis Bank</div>
                  <div className="p-1">Bank Account Number- 810552237XXXXX</div>
                </div>
                <div className="flex justify-between border-white">
                  <div className="p-1">PF Number- UTIB004536 </div>
                  <div className="p-1">UAN Number- 1234567890</div>
                </div>
              </div> */}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default PaySlip;
