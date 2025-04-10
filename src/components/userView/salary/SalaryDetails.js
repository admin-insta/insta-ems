import React, { useState } from "react";
import Button from "../../utils/theme/Button";
import InputField from "../../utils/theme/InputField";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
const SalaryDetails = ({
  isSalaryEditMode,
  setIsSalaryEditMode,
  handleCtcEditToggle,
  selectedEmployeeSalary,
  salaryDetails,
  handleSalaryChange
}) => {
  return (
    <div className="shadow-md p-2 mt-2">
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
          <Button variant="primary"> CTC Amount</Button>
          <InputField
            name="ctc"
            value={salaryDetails?.ctc}
            onChange={handleSalaryChange}
            disabled={!isSalaryEditMode}
          />
        </div>

        {/* Salary fields (Non Editable) */}
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>Basic -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-700" />
            {salaryDetails?.basic}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>HRA -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-700" />
            {salaryDetails?.hra}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>Special Allowance -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-700" />
            {salaryDetails?.specialAllowance}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>Professional Tax -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-700" />
            {salaryDetails?.professionalTax}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>PF Amount of Employee-</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-700" />
            {salaryDetails?.pfEmployee}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>PF Amount of Employer -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-700" />
            {salaryDetails?.pfEmployer}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          <span>Gratuity -</span>
          <span className="flex items-center">
            <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-700" />
            {salaryDetails?.pfEmployer|| "0"}
          </span>
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          Total Earnings
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          Total Deductions
        </div>
        <div className="flex justify-between my-1 p-2 bg-white rounded-sm">
          Net Salary
        </div>

        
      </div>
    </div>
  );
};

export default SalaryDetails;
