import { useMemo } from "react";

const parseSalaryValue = (val) => Number(val?.toString().replace(/[^0-9.-]+/g, "")) || 0;

const useSalaryCalculations = (salaryDetails) => {
  const totals = useMemo(() => {
    if (!salaryDetails) return { totalEarnings: "Rs. 0", totalDeductions: "Rs. 0", netSalary: "Rs. 0" };

    const totalEarnings =
      parseSalaryValue(salaryDetails.basic) +
      parseSalaryValue(salaryDetails.hra) +
      parseSalaryValue(salaryDetails.bonus) +
      parseSalaryValue(salaryDetails.specialAllowance) +
      parseSalaryValue(salaryDetails.pfEmployer);

    const totalDeductions =
      parseSalaryValue(salaryDetails.professionaltax) +
      parseSalaryValue(salaryDetails.incomeTax) +
      parseSalaryValue(salaryDetails.pfEmployee) +
      parseSalaryValue(salaryDetails.deductions);

    const netSalary = totalEarnings - totalDeductions;

    return {
      totalEarnings: `Rs. ${totalEarnings.toFixed(2)}`,
      totalDeductions: `Rs. ${totalDeductions.toFixed(2)}`,
      netSalary: `Rs. ${netSalary.toFixed(2)}`,
    };
  }, [salaryDetails]); // Recalculate only when `salaryDetails` changes

  return totals;
};

export default useSalaryCalculations;
