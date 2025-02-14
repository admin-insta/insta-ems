import React, { useEffect, useState } from "react";
import { Dropdown } from "rsuite";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EmployeeList from "../EmployeeList";
import Button from "../../utils/theme/Button";
import { useSelector } from "react-redux";
import Card from "../../utils/theme/Cards";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
const PaySlip = () => {
  const people = useSelector((store) => store.people || []);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (people.length > 0 && !selectedEmployee) {
      setSelectedEmployee(people[0]);
    }
  }, [people, selectedEmployee]);
  return (
    <div className="grid grid-cols-12 gap-4 h-screen border-gray-300 bg-clay-light ">
      {/* Employee List Section */}
      <div className="col-span-3 ">
        <EmployeeList onSelectEmployee={setSelectedEmployee} />
      </div>

      <div className="col-span-9  ">
        <Card
          variant="secondary"
          fullScreen="true"
          title={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CurrencyBitcoinOutlinedIcon /> Salary Information
            </span>
          }
          description={
            <div className="flex flex-col p-2 shadow-md ">
              {/*select and download section*/}
              <div className="flex justify-between">
                <div className="flex justify-start">
                  <div className="mx-2">
                    <Button>Payslip</Button>
                  </div>
                  <div>
                    <Button variant="secondary">Reimbursement</Button>
                  </div>
                </div>

                <div>
                  <Dropdown sx={{ color: "red" }} title="Select Month">
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      JAN
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      FEB{" "}
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      MAR
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      APR
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      MAY
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      JUN
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      JUL
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      AUG
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      SEP
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      OCT
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      NOV
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100px", padding: "3px" }}>
                      DEC
                    </Dropdown.Item>
                  </Dropdown>
                  <span className="mx-2">
                    <Button>
                      <FileDownloadOutlinedIcon sx={{ color: "white" }} />
                    </Button>
                  </span>
                </div>
              </div>

              {/*Payslip Details Section*/}
              <div className="flex flex-row my-4 ">
                <div className="w-1/2 border shadow-md rounded-md  bg-[#abebc6] m-2">
                  <p className="p-2 border-b">Earnings</p>
                  <div className="p-2 bg-gray-200">
                    <span className="px-2 flex justify-end">
                      Amounts in (₹)
                    </span>
                  </div>
                  <div className="p-2 border-b border-white ">BASIC</div>
                  <div className="p-2 border-b border-white ">HRA</div>
                  <div className="p-2 border-b border-white">
                    SPECIAL ALLOWANCE
                  </div>
                  <div className="p-2 bg-white">Total -</div>
                </div>
                <div className="w-1/2 border shadow-md font-poppins rounded-md m-2 bg-[#abebc6]">
                  <p className="p-2 border-b">Deductions</p>
                  <div className="p-2 bg-gray-200">
                    <span className="px-2 flex justify-end">
                      Amounts in (₹)
                    </span>
                  </div>
                  <div className="p-2 border-b border-white">
                    Professional Tax
                  </div>
                  <div className="p-2 border-b border-white">Income Tax</div>
                  <div className="p-2 border-b border-white">
                    Total Duductions-
                  </div>
                  <div className="p-2 bg-white">Net Pay-</div>
                </div>
              </div>

              {/*Employee bak Deatils Section*/}
              <div className="my-4  mx-2 p-1 border shadow-md  bg-[#abebc6] text-base rounded-md">
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

                <div className="p-1">PF Number- UTIB004536 </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default PaySlip;
