import React, { useEffect, useState } from "react";
import Card from "../../utils/theme/Cards";
import ConfirmationDialog from "../../utils/theme/ConfirmationDialog";
import Men_Dummy from "../../utils/images/Men_Dummy.jpg";
import { toast } from "react-toastify";
import {
  createSalaryAccount,
  createSalaryFromCtc,
  fetchSalary,
  updateSalaryAccount,
} from "../../../api/salary";
import { useDispatch, useSelector } from "react-redux";
import { setSalary } from "../../store/salarySlice";
import BankAccountDetails from "./BankAccountDetails";
import SalaryDetails from "./SalaryDetails";

const SalaryDescription = () => {
  const dispatch = useDispatch();
  const salary = useSelector((store) => store?.salary?.salary?.salary);
  const selectedEmployee = useSelector(
    (store) => store?.employee?.selectedEmployee
  );
  const [selectedEmployeeSalary, setSelectedSalaryEmployee] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [isAccountEditMode, setIsAccountEditMode] = useState(false);
  const [isSalaryEditMode, setIsSalaryEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    const getSalary = async () => {
      if (!selectedEmployee?._id) return;
      const result = await fetchSalary(selectedEmployee._id);
      if (result.success) {
        dispatch(setSalary(result.salary));
      } else {
        console.error(result.message);
      }
    };
    getSalary();
  }, [selectedEmployee]);

  useEffect(() => {
    if (salary && selectedEmployee?._id) {
      setSelectedSalaryEmployee(salary);
      setAccountDetails({
        employeeId: selectedEmployee?._id,
        bankName: salary?.bankName || "",
        panNumber: salary?.panNumber || "",
        ifscCode: salary?.ifscCode || "",
        uanNumber: salary?.uanNumber || "",
        accountNumber: salary?.accountNumber || "",
        pfNumberOfEmployee: salary?.pfNumberOfEmployee || "",
        pfNumberOfEmployer: salary?.pfNumberOfEmployer || "",
      });
      setSalaryDetails({
        employeeId: selectedEmployee._id,
        ctc: salary.salaryStructure?.ctc || "Rs. 0",
        basic: salary.salaryStructure?.basic || "Rs. 0",
        hra: salary.salaryStructure?.hra || "Rs. 0",
        bonus: salary.salaryStructure?.bonus || "Rs. 0",
        specialAllowance: salary.salaryStructure?.specialAllowance || "Rs. 0",
        professionalTax: salary.salaryStructure?.professionalTax || "Rs. 0",
        incomeTax: salary.salaryStructure?.incomeTax || "Rs. 0",
        deductions: salary.salaryStructure?.deductions || "Rs. 0",
        pfEmployee: salary.salaryStructure?.pfEmployee || "Rs. 0",
        pfEmployer: salary.salaryStructure?.pfEmployer || "Rs. 0",
        totalEarnings: salary?.totalEarnings || "Rs. 0",
        totalDeductions: salary?.totalDeductions || "Rs. 0",
        netSalary: salary?.netSalary || "Rs. 0",
      });
    } else {
      setSelectedSalaryEmployee(null);
      setAccountDetails(null);
      setSalaryDetails(null);
    }
  }, [salary, selectedEmployee]);

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

  const handleAccountEditToggle = () => {
    if (isAccountEditMode) {
      const isFormValid = Object.values(accountDetails).every(
        (value) => value !== null && value !== undefined && value !== ""
      );

      if (!isFormValid) {
        toast.error("Fill all the fields before saving.");
        return;
      }

      confirmActionHandler(
        "Confirm Employee Save",
        "Are you sure you want to save the changes?",
        async () => {
          try {
            console.log("Account Details", accountDetails);
            const payload = {
              employeeId: selectedEmployee?._id,
              ...accountDetails,
            };
            let result;
            if (isAccountEditMode) {
              result = await updateSalaryAccount(payload);
            } else {
              result = await createSalaryAccount(payload);
            }
            // const result = await createSalaryAccount(payload);
            if (result.success) {
              const updatedSalaryAccount = await fetchSalary(
                selectedEmployee._id
              );
              if (updatedSalaryAccount.success) {
                dispatch(setSalary(updatedSalaryAccount.salary));
                toast.success("Bank details saved successfully!");
              }
            }
          } catch (error) {
            console.error("Something went wrong", error);
          }
          setIsAccountEditMode(false);
        }
      );
    } else {
      setIsAccountEditMode(true);
    }
  };

  const handleCtcEditToggle = () => {
    if (isSalaryEditMode) {
      confirmActionHandler(
        "Confirm Salary Revision",
        "Are you sure you want to revise the salary details?",
        async () => {
          try {
            const payload = {
              ctc: salaryDetails.ctc,
              employeeId: selectedEmployee?._id,
            };
            const result = await createSalaryFromCtc(payload);
            if (result.success) {
              const updatedSalary = await fetchSalary(selectedEmployee._id);
              if (updatedSalary.success) {
                dispatch(setSalary(updatedSalary.salary));
                toast.success("Salary updated!");
              }
            }
          } catch (error) {
            console.log("Something went wrong", error);
          }
          setIsSalaryEditMode(false);
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
              <div className="flex items-center justify-center h-20 w-20 rounded-full overflow-hidden border">
                <img
                style={{
                  width: "80px",
                  height: '80px',
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center 10% ", 
                }}
                  className="h-full w-full object-cover"
                  alt="profile-pic"
                  src={selectedEmployee?.profilePicture || Men_Dummy}
                />
              </div>
              <div>
                <div className="text-sm">{selectedEmployee?.name}</div>
                <div className="text-xs">{selectedEmployee?.designation}</div>
              </div>
            </div>

            <form className="grid border grid-cols-2 gap-4">
              <BankAccountDetails
                isAccountEditMode={isAccountEditMode}
                handleAccountEditToggle={handleAccountEditToggle}
                selectedEmployeeSalary={selectedEmployeeSalary}
                accountDetails={accountDetails}
                handleEmployeeChange={handleEmployeeChange}
                setIsAccountEditMode={setIsAccountEditMode}
              />
              <SalaryDetails
                isSalaryEditMode={isSalaryEditMode}
                handleCtcEditToggle={handleCtcEditToggle}
                selectedEmployeeSalary={selectedEmployeeSalary}
                salaryDetails={salaryDetails}
                handleSalaryChange={handleSalaryChange}
                setIsSalaryEditMode={setIsSalaryEditMode}
              />
            </form>
          </>
        }
      />
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
