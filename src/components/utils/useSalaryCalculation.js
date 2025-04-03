import { useMemo } from "react";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
const parseSalaryValue = (val) => Number(val?.toString().replace(/[^0-9.-]+/g, "")) || 0;

const formatCurrency = (amount) => {
  return ` ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
};



const useSalaryCalculations = (salaryDetails) => {
  const totals = useMemo(() => {
    if (!salaryDetails) return { 
      totalEarnings: <span>Rs. 0</span>, 
      yearlyTotalEarnings: <span>Rs. 0</span>,
      totalDeductions: <span>Rs. 0</span>, 
      netSalary: <span>Rs. 0</span> 
    };
  
    const totalEarnings =
      parseSalaryValue(salaryDetails.basic) +
      parseSalaryValue(salaryDetails.hra) +
      parseSalaryValue(salaryDetails.bonus) +
      parseSalaryValue(salaryDetails.specialAllowance) +
      parseSalaryValue(salaryDetails.pfEmployer);
  
    const yearlyTotalEarnings = totalEarnings * 12;
  
    const totalDeductions =
      parseSalaryValue(salaryDetails.professionaltax) +
      parseSalaryValue(salaryDetails.incomeTax) +
      parseSalaryValue(salaryDetails.pfEmployee) +
      parseSalaryValue(salaryDetails.deductions);
  
    const netSalary = totalEarnings - totalDeductions;
  
    return {
      totalEarnings: formatCurrency(totalEarnings),
      yearlyTotalEarnings: formatCurrency(yearlyTotalEarnings),
      totalDeductions: formatCurrency(totalDeductions),
      netSalary: formatCurrency(netSalary),
    };
  }, [salaryDetails]);
  // Recalculate only when `salaryDetails` changes

  return totals;
};

export default useSalaryCalculations;
