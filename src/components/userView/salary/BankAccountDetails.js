import React from "react";
import Button from "../../utils/theme/Button";
import InputField from "../../utils/theme/InputField";
import { bankList } from "../../utils/bankList";

const BankAccountDetails = ({
  isAccountEditMode,
  setIsAccountEditMode,
  handleAccountEditToggle,
  selectedEmployeeSalary,
  accountDetails,
  handleEmployeeChange,
}) => {
  return (
    <div className="shadow-md p-2">
      <div className="flex justify-between items-center my-2 bg-[#BDBAA2] p-2">
        <span className="font-semibold text-base">Bank Account Details</span>
        <div className="flex justify-end items-center gap-2">
          {isAccountEditMode && (
            <Button
              variant="secondary"
              onClick={() => setIsAccountEditMode(false)}
            >
              Cancel
            </Button>
          )}
          <Button onClick={handleAccountEditToggle}>
            {isAccountEditMode
              ? "Save"
              : selectedEmployeeSalary
              ? "Update"
              : "Add"}
          </Button>
        </div>
      </div>

      <div className="border p-2 bg-[#BDBAA2] flex flex-col gap-2">
        <InputField
          label="PAN Number *"
          name="panNumber"
          value={accountDetails?.panNumber || ""}
          onChange={handleEmployeeChange}
          disabled={!isAccountEditMode}
        />

        <div>
          <label className="text-xs font-medium text-blue-700">Bank Name *</label>
          <select
            name="bankName"
            value={accountDetails?.bankName || ""}
            onChange={handleEmployeeChange}
            disabled={!isAccountEditMode}
            className="w-full p-2 mt-1 border rounded-md"
          >
            <option value="" disabled>
              Select Bank
            </option>
            {bankList.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="Bank Account Number *"
          name="accountNumber"
          value={accountDetails?.accountNumber || ""}
          onChange={handleEmployeeChange}
          disabled={!isAccountEditMode}
        />
        <InputField
          label="IFSC Code *"
          name="ifscCode"
          value={accountDetails?.ifscCode || ""}
          onChange={handleEmployeeChange}
          disabled={!isAccountEditMode}
        />
        <InputField
          label="UAN Number *"
          name="uanNumber"
          value={accountDetails?.uanNumber || ""}
          onChange={handleEmployeeChange}
          disabled={!isAccountEditMode}
        />
        <InputField
          label="PF Number of Employee *"
          name="pfNumberOfEmployee"
          value={accountDetails?.pfNumberOfEmployee || ""}
          onChange={handleEmployeeChange}
          disabled={!isAccountEditMode}
        />
        <InputField
          label="PF Number of Employer *"
          name="pfNumberOfEmployer"
          value={accountDetails?.pfNumberOfEmployer || ""}
          onChange={handleEmployeeChange}
          disabled={!isAccountEditMode}
        />
      </div>
    </div>
  );
};

export default BankAccountDetails;
