import React, { useEffect, useState } from "react";
import Card from "../../utils/theme/Cards";
import ConfirmationDialog from "../../utils/theme/ConfirmationDialog";
import Men_Dummy from "../../utils/images/Men_Dummy.jpg";
import { toast } from "react-toastify";
import {
  createSalary,
  createSalaryAccount,
  fetchSalary,
} from "../../../api/salary";
import { useDispatch, useSelector } from "react-redux";
import { addSalary } from "../../store/salarySlice";
import BankAccountDetails from "./BankAccountDetails";
import SalaryDetails from "./SalaryDetails";
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

  const [ctcDetails, setCtcDetails] = useState(null);

  const [salaryDetails, setSalaryDetails] = useState({
    employeeId: selectedEmployee?._id,
    basic: selectedEmployeeSalary?.salaryStructure?.basic || "Rs. 0",
    hra: selectedEmployeeSalary?.salaryStructure?.hra || "Rs. 0",
    bonus: selectedEmployeeSalary?.salaryStructure?.bonus || "Rs. 0",
    specialAllowance:
      selectedEmployeeSalary?.salaryStructure?.specialAllowance || "Rs. 0",
    professionaltax:
      selectedEmployeeSalary?.salaryStructure?.professionaltax || "Rs. 0",
    incomeTax: selectedEmployeeSalary?.salaryStructure?.incomeTax || "Rs. 0",
    deductions: selectedEmployeeSalary?.salaryStructure?.deductions || "Rs. 0",
    pfEmployee:
      selectedEmployeeSalary?.salaryStructure?.pfEmployee || "Rs. 0000",
    pfEmployer:
      selectedEmployeeSalary?.salaryStructure?.pfEmployer || "Rs. 0000",
  });
  // 🔹 Fetch salaries when the component mounts
  useEffect(
    () => {
      const getSalary = async () => {
        const result = await fetchSalary();
        if (result.success) {
          dispatch(addSalary(result.salary)); // Store all salaries in Redux
        } else {
          console.error(result.message);
        }
      };
      getSalary();
    },
    [accountDetails],
    [salaryDetails]
  );

  useEffect(() => {
    if (selectedEmployee) {
      const foundSalary = salaries.find(
        (sal) => String(sal.employeeId) === String(selectedEmployee._id)
      );
      if (foundSalary) {
        setSelectedSalaryEmployee(foundSalary);
        setAccountDetails(foundSalary);
        setSalaryDetails(foundSalary?.salaryStructure);
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
        setSalaryDetails({
          basic: " Rs. 0",
          hra: "0",
          bonus: "0",
          specialAllowance: "0",
          incomeTax: "0",
          professionalTax: "0",
          deductions: "0",
          pfEmployee: "0",
          pfEmployer: "0",
        });
      }

      // 👉 Reset edit modes when employee changes
      setIsEmployeeEditMode(false);
      setIsSalaryEditMode(false);
    }
  }, [selectedEmployee]);

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
      // 🛑 Validation: Check if any field in accountDetails is empty
      const isFormValid = Object.values(accountDetails).every(
        (value) => value !== null && value !== undefined && value !== ""
      );

      if (!isFormValid) {
        toast.error("Fill all the fields before saving.");
        return;
      }
      // Save logic
      confirmActionHandler(
        "Confirm Employee Save",
        "Are you sure you want to save the changes?",
        async () => {
          try {
            const result = await createSalaryAccount(accountDetails);
            if (result.success) {
              const updatedSalaryAccount = await fetchSalary();
              if (updatedSalaryAccount.success) {
                setAccountDetails(
                  updatedSalaryAccount.salary?.accountDetails || {}
                );
                setSalaryDetails(
                  updatedSalaryAccount.salary?.salaryDetails || {}
                );
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

  const handleSalaryEditToggle = () => {
    if (isSalaryEditMode) {
      confirmActionHandler(
        "Confirm Salary Revision",
        "Are you sure you want to revise the salary details?",
        async () => {
          try {
            const payload = {
              ...salaryDetails,
              employeeId: selectedEmployee?._id, // ✅ Ensure employeeId is included
            };
            const result = await createSalary(payload);
            if (result.success) {
              const updatedSalary = await fetchSalary();
              console.log("updatedSalary", updatedSalary);
              if (updatedSalary.success) {
                setSalaryDetails(updatedSalary.salary?.salaryDetails || {});
              }
            }
          } catch (error) {
            console.log("Something went wrong", error);
          }
          setIsEmployeeEditMode(false);
        }
      );
    } else {
      setIsSalaryEditMode(true);
    }
  };
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
        variant="secondary"
        fullScreen="true"
        description={
          <>
            <div className="border p-4 flex justify-between bg-[#BDBAA2] text-gray-900">
              <div className="">
                <img className="h-12" alt="profile-pic" src={Men_Dummy} />
              </div>
              <div>
                <div className="text-sm">{selectedEmployee?.name}</div>
                <div className="text-xs">{selectedEmployee?.designation}</div>
              </div>
            </div>
            <form className="grid border grid-cols-2 gap-4">
              {/* Employee Details Section */}
              <BankAccountDetails
                isEmployeeEditMode={isEmployeeEditMode}
                setIsEmployeeEditMode={setIsEmployeeEditMode}
                handleEmployeeEditToggle={handleEmployeeEditToggle}
                selectedEmployeeSalary={selectedEmployeeSalary}
                accountDetails={accountDetails}
                handleEmployeeChange={handleEmployeeChange}
              />

              {/* Salary Details Section */}
              <SalaryDetails
                isSalaryEditMode={isSalaryEditMode}
                setIsSalaryEditMode={setIsSalaryEditMode}
                handleSalaryEditToggle={handleSalaryEditToggle}
                selectedEmployeeSalary={selectedEmployeeSalary}
                salaryDetails={salaryDetails}
                handleSalaryChange={handleSalaryChange}
              />
            </form>
          </>
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
