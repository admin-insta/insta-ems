import React, { useEffect, useState } from "react";
import Card from "../../utils/theme/Cards";
import InputField from "../../utils/theme/InputField";
import Button from "../../utils/theme/Button";
import ConfirmationDialog from "../../utils/theme/ConfirmationDialog";
import { fetchSalary } from "../../../api/salary";
const SalaryDescription = () => {
  const [isEmployeeEditMode, setIsEmployeeEditMode] = useState(false);
  const [isSalaryEditMode, setIsSalaryEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const [employeeDetails, setEmployeeDetails] = useState({
    bankName: "State Bank of India",
    panNumber: "BLMPB69226",
    bankAccount: "9182302348762738",
    ifscCode: "UTIB67345",
    uanNumber: "100456789123",
    pfNumberOfEmployee: " MH/BAN/1234567/000/0001234",
    pfNumberOfEmployer: "DL/CPM/9876543/000/0005678",
  });

  const [salaryDetails, setSalaryDetails] = useState({
    netSalary: "Rs. 50,000",
    basicSalary: "Rs. 30,130",
    hra: "Rs. 10,257",
    bonus: "Rs. 7,257",
    specialAllowance: "Rs. 1,557",
    yearlySalary: "Rs. 6,00,000",
    pfAmount: "Rs. 3000",
  });

  useEffect(() => {
    const getSalary = async () => {
      const result = await fetchSalary();
      console.log("salary data is ", result);
    };
    getSalary();
  }, []);

  const bankList = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Union Bank of India",
    "Canara Bank",
    "IndusInd Bank",
  ];

  const confirmActionHandler = (title, message, action) => {
    setDialogConfig({
      title,
      message,
      onConfirm: () => {
        action();
        setShowConfirmation(false);
      },
    });
    setShowConfirmation(true);
  };

  const handleEmployeeEditToggle = () =>
    confirmActionHandler(
      "Confirm Employee Edit",
      "Are you sure you want to edit the employee details?",
      () => setIsEmployeeEditMode(!isEmployeeEditMode)
    );

  const handleSalaryEditToggle = () =>
    confirmActionHandler(
      "Confirm Salary Revision",
      "Are you sure you want to revise the salary details?",
      () => setIsSalaryEditMode(!isSalaryEditMode)
    );

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setSalaryDetails({ ...salaryDetails, [name]: value });
  };

  return (
    <div>
      <Card
        variant="primary"
        fullScreen="true"
        description={
          <form className="grid grid-cols-2 gap-4">
            {/* Employee Details Section */}
            <div className="border shadow-md p-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-base">
                  Employee Details
                </span>
                <Button onClick={handleEmployeeEditToggle}>
                  {isEmployeeEditMode ? "Save" : "Update"}
                </Button>
              </div>
              <InputField
                label="Employee Name"
                value="Ashish Kumar"
                disabled={true}
              />
              <InputField
                label="Email"
                value="ashish.dypcoe@gmail.com"
                disabled={true}
              />
              <InputField
                label="PAN Number"
                name="panNumber"
                value={employeeDetails.panNumber}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              {/* Bank Name Dropdown */}
              <div className="my-2">
                <label className="text-xs font-medium text-blue-700">
                  Bank Name
                </label>
                <select
                  name="bankName"
                  value={employeeDetails.bankName}
                  onChange={handleEmployeeChange}
                  disabled={!isEmployeeEditMode}
                  className="w-full p-2 border rounded-md"
                >
                  {bankList.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <InputField
                label="Bank Account Number"
                name="bankAccount"
                value={employeeDetails.bankAccount}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <InputField
                label="IFSC Code"
                name="ifscCode"
                value={employeeDetails.ifscCode}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <InputField
                label="UAN Number"
                name="uanNumber"
                value={employeeDetails.uanNumber}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <InputField
                label="PF Number of Employee"
                name="PF Number Of Employee"
                value={employeeDetails.pfNumberOfEmployee}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <InputField
                label="PF Number of Employer"
                name="PF Number Of Employer"
                value={employeeDetails.pfNumberOfEmployer}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
            </div>

            {/* Salary Details Section */}
            <div className="border shadow-md p-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-base">Salary Details</span>
                <Button onClick={handleSalaryEditToggle}>
                  {isSalaryEditMode ? "Save" : "Revise"}
                </Button>
              </div>
              <InputField
                label="Net Monthly Salary"
                name="netSalary"
                value={salaryDetails.netSalary}
                onChange={handleSalaryChange}
                disabled={!isSalaryEditMode}
              />
              <InputField
                label="BASIC Salary"
                name="basicSalary"
                value={salaryDetails.basicSalary}
                onChange={handleSalaryChange}
                disabled={!isSalaryEditMode}
              />
              <InputField
                label="HRA"
                name="hra"
                value={salaryDetails.hra}
                onChange={handleSalaryChange}
                disabled={!isSalaryEditMode}
              />
              <InputField
                label="BONUS"
                name="bonus"
                value={salaryDetails.bonus}
                onChange={handleSalaryChange}
                disabled={!isSalaryEditMode}
              />
              <InputField
                label="Special Allowance"
                name="specialAllowance"
                value={salaryDetails.specialAllowance}
                onChange={handleSalaryChange}
                disabled={!isSalaryEditMode}
              />
              <InputField
                label="PF Amount"
                name="pfAmount"
                value={salaryDetails.pfAmount}
                onChange={handleSalaryChange}
                disabled={!isSalaryEditMode}
              />
              <InputField
                label="Yearly Salary"
                name="yearlySalary"
                value={salaryDetails.yearlySalary}
                onChange={handleSalaryChange}
                disabled={!isSalaryEditMode}
              />
            </div>
          </form>
        }
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={dialogConfig.onConfirm}
        title={dialogConfig.title}
        message={dialogConfig.message}
      />
    </div>
  );
};

export default SalaryDescription;
