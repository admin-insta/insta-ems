import React from "react";
import Button from "../../utils/theme/Button";
import InputField from "../../utils/theme/InputField";

const SalaryDetails = ({
  isSalaryEditMode,
  setIsSalaryEditMode,
  handleSalaryEditToggle,
  selectedEmployeeSalary,
  salaryDetails,
  handleSalaryChange,
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
          <Button onClick={handleSalaryEditToggle}>
            {isSalaryEditMode
              ? "Save"
              : selectedEmployeeSalary
              ? "Update"
              : "Add"}
          </Button>
        </div>
      </div>
      {console.log("salaryDetails of selecte employee", salaryDetails)}
      <div className="border p-2 bg-[#BDBAA2]">
        <InputField
          label="Basic *"
          name="basic"
          value={salaryDetails?.basic}
          onChange={handleSalaryChange}
          disabled={!isSalaryEditMode}
        />
        <InputField
          label="HRA *"
          name="hra"
          value={salaryDetails?.hra}
          onChange={handleSalaryChange}
          disabled={!isSalaryEditMode}
        />
        <InputField
          label="special Allowance  *"
          name="special Allowance "
          value={salaryDetails?.specialAllowance}
          onChange={handleSalaryChange}
          disabled={!isSalaryEditMode}
        />
        <InputField
          label="Income Tax *"
          name="Income tax"
          value={salaryDetails?.incomeTax}
          onChange={handleSalaryChange}
          disabled={!isSalaryEditMode}
        />
        <InputField
          label="Professional Tax *"
          name="professionalTax"
          value={salaryDetails?.professionalTax}
          onChange={handleSalaryChange}
          disabled={!isSalaryEditMode}
        />
        <InputField
          label=" Deduction *"
          name="Deduction"
          value={salaryDetails?.deductions}
          onChange={handleSalaryChange}
          disabled={!isSalaryEditMode}
        />
        <InputField
          label=" PF Of Employee *"
          name="PF Of Employee"
          value={salaryDetails?.pfEmployee}
          onChange={handleSalaryChange}
          disabled={!isSalaryEditMode}
        />
        <InputField
          label=" PF Of Employee *"
          name="PF Of Employer"
          value={salaryDetails?.pfEmployer}
          onChange={handleSalaryChange}
          disabled={!isSalaryEditMode}
        />
      </div>
    </div>
  );
};

export default SalaryDetails;
