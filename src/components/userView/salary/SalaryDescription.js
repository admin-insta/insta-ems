import React, { useEffect, useState } from "react";
import Card from "../../utils/theme/Cards";
import InputField from "../../utils/theme/InputField";
import Button from "../../utils/theme/Button";
import ConfirmationDialog from "../../utils/theme/ConfirmationDialog";
import { createSalary, fetchSalary } from "../../../api/salary";
import {useSelector } from "react-redux";
const SalaryDescription = () => {
  const selectedEmployee = useSelector((store) => store?.employee?.selectedEmployee);
  const [isEmployeeEditMode, setIsEmployeeEditMode] = useState(false);
  const [isSalaryEditMode, setIsSalaryEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    const getSalary = async () => {
      const result = await fetchSalary();
      console.log("salary result", result )
    };
    getSalary();
  }, []);

  const [accountDetails, setaccountDetails] = useState({
    employeeId:selectedEmployee._id,
    bankName: "",
    panNumber: "",
    ifscCode: "",
    uanNumber: "",
    accountNumber:"",
    pfNumberOfEmployee: " ",
    pfNumberOfEmployer: "",
  });

  const [salaryDetails, setSalaryDetails] = useState({
    netSalary: "Rs. 00,000",
    basicSalary: "Rs. 00,000",
    hra: "Rs. 00000 ",
    bonus: "Rs. 0000",
    specialAllowance: "Rs. 0000",
    yearlySalary: "Rs. 0000",
    pfAmount: "Rs. 0000",
  });

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

  const handleEmployeeEditToggle = () => {
    if (isEmployeeEditMode) {
      // Save logic
      confirmActionHandler(
        "Confirm Employee Save",
        "Are you sure you want to save the changes?",
        async () => {
          try {
            const result = await createSalary(accountDetails);
            if (result.success) {
              const updatedSalary = await fetchSalary();
              if (updatedSalary.success) {
                setaccountDetails(updatedSalary.salary?.accountDetails || {});
                setSalaryDetails(updatedSalary.salary?.salaryDetails || {});
              }
            }
          } catch (error) {
            console.error("Something went wrong", error);
          }
          setIsEmployeeEditMode(false);
        }
      );
    } else {
      // Enable edit mode
      setIsEmployeeEditMode(true);
    }
  };

  const handleSalaryEditToggle = () =>
    confirmActionHandler(
      "Confirm Salary Revision",
      "Are you sure you want to revise the salary details?",
      () => setIsSalaryEditMode(!isSalaryEditMode)
    );

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setaccountDetails({ ...accountDetails, [name]: value });
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
                value={selectedEmployee?.name}
                disabled={true}
              />
              <InputField
                label="Email"
                value={selectedEmployee?.email}
                disabled={true}
              />
              <InputField
                label="PAN Number"
                name="panNumber"
                value={accountDetails.panNumber}
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
                  value={accountDetails.bankName}
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
                name="accountNumber"
                value={accountDetails.accountNumber}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <InputField
                label="IFSC Code"
                name="ifscCode"
                value={accountDetails.ifscCode}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <InputField
                label="UAN Number"
                name="uanNumber"
                value={accountDetails.uanNumber}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <InputField
                label="PF Number of Employee"
                name="pfNumberOfEmployee"
                value={accountDetails.pfNumberOfEmployee}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <InputField
                label="PF Number of Employer"
                name="pfNumberOfEmployer"
                value={accountDetails.pfNumberOfEmployer}
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
