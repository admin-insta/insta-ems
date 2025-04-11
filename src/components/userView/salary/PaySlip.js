import React, { useEffect, useRef } from "react";
import Button from "../../utils/theme/Button";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../utils/theme/Cards";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import { setSelectedEmployee } from "../../store/employeeSlice";
import Men_Dummy from "../../utils/images/Men_Dummy.jpg";
import jsPDF from "jspdf";

const PaySlip = () => {
  const dispatch = useDispatch();
  const employee = useSelector((store) => store.employee || []);
  const selectedEmployee = useSelector(
    (store) => store?.employee?.selectedEmployee
  ); 
  const salary = useSelector((store)=>store?.salary?.salary?.salary);
  const pdfRef = useRef(); // Reference for PDF generation

  useEffect(() => {
    if (employee.length > 0 && !selectedEmployee) {
      dispatch(setSelectedEmployee(employee[0])); // Set the first employee
    }
  }, [employee, selectedEmployee]);

  // 📌 Function to Generate and Download PDF
  const handleDownloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4"); // Portrait mode, A4 size

    // **HEADER**
    pdf.setFontSize(16);
    pdf.text("XYZ Company Pvt Ltd", 15, 15); // Company Name
    pdf.setFontSize(12);
    pdf.text("Employee Salary Payslip", 15, 25);
    pdf.line(10, 30, 200, 30); // Header underline

    // **Employee Details**
    pdf.setFontSize(10);
    pdf.text(
      `Employee Name: ${selectedEmployee?.name || "Ashish Kumar"}`,
      15,
      40
    );
    pdf.text(
      `Designation: ${selectedEmployee?.designation || "Software Developer"}`,
      15,
      45
    );
    pdf.text(`Email: ${selectedEmployee?.email || "N/A"}`, 15, 50);
    pdf.text(
      `Salary Month: ${new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}`,
      15,
      55
    );

    // **Earnings Section**
    pdf.setFontSize(12);
    pdf.text("Earnings", 15, 65);
    pdf.setFontSize(10);
    pdf.text(
      `Basic Salary: ₹ ${salary?.salaryStructure?.basic || 0}`,
      15,
      72
    );
    pdf.text(`HRA: ₹ ${salary?.salaryStructure?.hra || 0}`, 15, 77);
    pdf.text(
      `Special Allowance: ₹ ${
        salary?.salaryStructure?.specialAllowance || 0
      }`,
      15,
      82
    );
    pdf.text(`Total Earnings: ₹ ${salary?.totalEarnings || 0}`, 15, 90);

    // **Deductions Section**
    pdf.setFontSize(12);
    pdf.text("Deductions", 110, 65);
    pdf.setFontSize(10);
    pdf.text(
      `Professional Tax: ₹ ${
        salary?.salaryStructure?.professionalTax || 0
      }`,
      110,
      72
    );
    pdf.text(
      `Income Tax: ₹ ${salary?.salaryStructure?.incomeTax || 0}`,
      110,
      77
    );
    pdf.text(`Total Deductions: ₹ ${salary?.totalDeductions || 0}`, 110, 85);

    // **Net Pay**
    pdf.setFontSize(12);
    pdf.text("Net Salary", 15, 100);
    pdf.setFontSize(10);
    pdf.text(`₹ ${salary?.netSalary || 0}`, 15, 107);

    // **Footer**
    pdf.line(10, 285, 200, 285);
    pdf.setFontSize(8);
    pdf.text("Company Address: 123 Business St, City, Country", 15, 290);
    pdf.text("Authorized Signature", 150, 290);
    pdf.text("__________________", 150, 295); // Signature line

    // **Save PDF**
    pdf.save(`${selectedEmployee?.name}_PaySlip.pdf`);
  };

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
              {/* 📌 Download PDF Button */}
              <div className="text-sm font-normal gap-2 flex items-center">
                <Button variant="secondary"> Select Month </Button>
                <Button variant="primary" onClick={handleDownloadPDF}>
                  Download Payslip
                </Button>
              </div>
            </div>
          }
          description={
            <div ref={pdfRef} className="flex flex-col p-2 shadow-md bg-white">
              {/* Profile Section */}
              <div className="mx-2 gap-2 grid grid-cols-12 p-2 bg-[#d1cbc1] rounded-md shadow-md">
                <div className="col-span-9 flex flex-col items-start min-w-0">
                  <div className="text-8xl">
                    <img className="h-24" alt="profile-pic" src={Men_Dummy} />
                  </div>
                  <div className="text-xs border-b">
                    EMAIL ID: {selectedEmployee?.email}
                  </div>
                  <div className="text-xs">Reporting Manager:</div>
                </div>
                <div className="col-span-3 flex flex-col min-w-0">
                  <div className="border-b whitespace-nowrap">
                    {selectedEmployee?.name || "No Name"}
                  </div>
                  <div className="border-b whitespace-nowrap text-sm">
                    {selectedEmployee?.designation || "Software Developer"}
                  </div>
                </div>
              </div>

              {/* Payslip Details Section */}
              <div className="flex flex-row my-2">
                {/* Earnings Section */}
                <div className="w-1/2 border shadow-md rounded-md bg-[#d1cbc1] m-2">
                  <p className="p-2 border-b">Earnings</p>
                  <div className="p-2 bg-gray-200 flex justify-end">
                    <span>Amounts in (₹)</span>
                  </div>
                  <div className="p-2 border-b flex justify-between">
                    <span>BASIC</span>
                    <span>{salary?.salaryStructure?.basic}</span>
                  </div>
                  <div className="p-2 border-b flex justify-between">
                    <span>HRA</span>
                    <span>{salary?.salaryStructure?.hra}</span>
                  </div>
                  <div className="p-2 border-b flex justify-between">
                    <span>SPECIAL ALLOWANCE</span>
                    <span>
                      {salary?.salaryStructure?.specialAllowance}
                    </span>
                  </div>
                  <div className="p-2 bg-white flex justify-between">
                    <span>Total Earnings:</span>
                    <span>{salary?.totalEarnings}</span>
                  </div>
                </div>

                {/* Deductions Section */}
                <div className="w-1/2 border shadow-md rounded-md bg-[#d1cbc1] m-2">
                  <p className="p-2 border-b">Deductions</p>
                  <div className="p-2 bg-gray-200 flex justify-end">
                    <span>Amounts in (₹)</span>
                  </div>
                  <div className="p-2 border-b flex justify-between">
                    <span>Professional Tax</span>
                    <span>
                      {salary?.salaryStructure?.professionalTax}
                    </span>
                  </div>
                  <div className="p-2 border-b flex justify-between">
                    <span>Income Tax</span>
                    <span>{salary?.salaryStructure?.incomeTax}</span>
                  </div>
                  <div className="p-2 border-b flex justify-between">
                    <span>Other deductions </span>
                    <span>{salary?.salaryStructure?.deductions}</span>
                  </div>
                  <div className="p-2 border-b flex justify-between">
                    <span>Total Deductions:</span>
                    <span>{salary?.totalDeductions}</span>
                  </div>
                  <div className="p-2 bg-white flex justify-between">
                    <span>Net Pay:</span>
                    <span>{salary?.netSalary}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default PaySlip;
