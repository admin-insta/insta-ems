import React from "react";
import Button from "../../utils/theme/Button";
import InputField from "../../utils/theme/InputField";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const SalaryDetails = ({
  isSalaryEditMode,
  setIsSalaryEditMode,
  handleCtcEditToggle,
  selectedEmployeeSalary,
  salaryDetails,
  handleSalaryChange,
}) => {
  return (
    <div className="shadow-md p-2 ">
      <div className="flex justify-between items-center my-2 bg-[#BDBAA2] p-2">
        <span className="font-semibold text-base">Salary Details</span>
        <div className="flex justify-end items-center gap-2">
          {isSalaryEditMode && (
            <Button
              variant="secondary"
              onClick={() => setIsSalaryEditMode(false)}
            >
              Cancel
            </Button>
          )}
          <Button onClick={handleCtcEditToggle}>
            {isSalaryEditMode
              ? "Save"
              : selectedEmployeeSalary
              ? "Revise CTC"
              : "Add CTC"}
          </Button>
        </div>
      </div>

      <div className="border p-2 bg-[#BDBAA2]">
        {/* CTC Editable */}
        <div className="flex justify-between items-center my-2">
          <div className="bg-green-700 text-white p-2 rounded-sm">CTC Amount</div>
          <span className="flex justify-center items-center">
            <RiMoneyRupeeCircleFill className="h-8 w-8 mr-1 text-gray-800" />
            <InputField
              name="ctc"
              value={salaryDetails?.ctc||"0"}
              onChange={handleSalaryChange}
              disabled={!isSalaryEditMode}
            />
          </span>
        </div>

        {/* Salary fields (Non Editable) */}
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>Basic -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.basic||"0"}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>HRA -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.hra||"0"}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>Special Allowance -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.specialAllowance||"0"}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>Income Tax -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.incomeTax||"0"}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>Professional Tax -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.professionalTax||"0"}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>PF Amount of Employee-</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.pfEmployee||"0"}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>PF Amount of Employer -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.pfEmployer||"0"}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>Gratuity -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.pfEmployer || "0"}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-gray-100 rounded-sm">
          <span>Total Earnings-</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.totalEarnings || "0"}
          </span>
        </div>

        <div className="flex justify-between my-1 p-2 bg-gray-100 rounded-sm">
          <span>Total Deductions-</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.totalDeductions || "0"}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-gray-100 rounded-sm">
          <span>Net Salary-</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-800" />
            {salaryDetails?.netSalary || "0"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalaryDetails;
