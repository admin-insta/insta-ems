import React, { useEffect, useState } from "react";
import Card from "../../utils/theme/Cards";
import InputField from "../../utils/theme/InputField";
import Button from "../../utils/theme/Button";
import ConfirmationDialog from "../../utils/theme/ConfirmationDialog";
import { createSalary, fetchSalary } from "../../../api/salary";
import { useDispatch, useSelector } from "react-redux";
import { addSalary } from "../../store/salarySlice";

const SalaryDescription = () => {
  const dispatch = useDispatch();
  const salaries = useSelector((store) => store?.salary?.salaries.flat() || []);
  const [selectedEmployeeSalary, setSelectedSalaryEmployee] = useState(null);
  const selectedEmployee = useSelector(
    (store) => store?.employee?.selectedEmployee
  );
  const [isEmployeeEditMode, setIsEmployeeEditMode] = useState(false);
  const [isSalaryEditMode, setIsSalaryEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const [accountDetails, setAccountDetails] = useState({
    employeeId: selectedEmployee?._id,
    bankName: selectedEmployeeSalary?.bankName || "",
    panNumber: selectedEmployeeSalary?.panNumber || "",
    ifscCode: selectedEmployeeSalary?.ifscCode || "",
    uanNumber: selectedEmployeeSalary?.uanNumber || "",
    accountNumber: selectedEmployeeSalary?.accountNumber || "",
    pfNumberOfEmployee: selectedEmployeeSalary?.pfNumberOfEmployee || "",
    pfNumberOfEmployer: selectedEmployeeSalary?.pfNumberOfEmployer || "",
  });

  const [salaryDetails, setSalaryDetails] = useState({
    netSalary: "Rs. 00,000",
    basicSalary: "Rs. 00,000",
    hra: "Rs. 00000",
    bonus: "Rs. 0000",
    specialAllowance: "Rs. 0000",
    yearlySalary: "Rs. 0000",
    pfAmount: "Rs. 0000",
  });
  // 🔹 Fetch salaries when the component mounts
  useEffect(() => {
    const getSalary = async () => {
      const result = await fetchSalary();
      if (result.success) {
        dispatch(addSalary(result.salary)); // Store all salaries in Redux
      } else {
        console.error(result.message);
      }
    };
    getSalary();
  }, [dispatch]);

  useEffect(() => {
    if (selectedEmployee) {
      const foundSalary = salaries.find(
        (sal) => String(sal.employeeId) === String(selectedEmployee._id)
      );
      if (foundSalary) {
        setSelectedSalaryEmployee(foundSalary);
        setAccountDetails(foundSalary);
      } else {
        setSelectedSalaryEmployee(null);
        setAccountDetails({
          employeeId: selectedEmployee._id,
          bankName: "",
          panNumber: "",
          ifscCode: "",
          uanNumber: "",
          accountNumber: "",
          pfNumberOfEmployee: "",
          pfNumberOfEmployer: "",
        });
      }
    }
  }, [selectedEmployee]);

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
                setAccountDetails(updatedSalary.salary?.accountDetails || {});
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
    setAccountDetails({ ...accountDetails, [name]: value });
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
                value={accountDetails?.panNumber}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <div className="my-2">
                <label className="text-xs font-medium text-blue-700">
                  Bank Name
                </label>
                <select
                  name="bankName"
                  value={accountDetails.bankName || ""} // ✅ Ensures it always has a default value
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
                value={accountDetails?.accountNumber}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <InputField
                label="IFSC Code"
                name="ifscCode"
                value={accountDetails?.ifscCode}
                onChange={handleEmployeeChange}
                disabled={!isEmployeeEditMode}
              />
              <InputField
                label="UAN Number"
                name="uanNumber"
                value={accountDetails?.uanNumber}
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
              {Object.entries(salaryDetails || {}).map(([key, value]) => (
                <InputField
                  key={key}
                  label={key.replace(/([A-Z])/g, " $1")}
                  name={key}
                  value={value}
                  onChange={handleSalaryChange}
                  disabled={!isSalaryEditMode}
                />
              ))}
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
