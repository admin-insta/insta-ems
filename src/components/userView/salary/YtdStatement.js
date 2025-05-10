import React, { useState } from "react";
import Button from "../../utils/theme/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { mockYtdData } from "../../utils/mockYtdData";
const YtdStatement = () => {
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [showIncome, setShowIncome] = useState(false);
  const [showDeductions, setShowDeductions] = useState(false);
  const [showDays, setShowDays] = useState(false);

  const financialYears = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];
  const months = [
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December", "January", "February", "March"
  ];



  return (
    <div className="shadow-lg bg-white p-4 ">
      <div className="flex justify-between mb-4 gap-2">
        <Button variant="primary">YTD Statement</Button>
        <Button variant="secondary">Download</Button>
      </div>

      {/* Financial Year Dropdown */}
      <div className="flex justify-end gap-2 mb-4">
        <select
          className="border border-gray-700 p-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {financialYears.map((year) => (
            <option key={year} value={year}>
              {`April, ${year.split("-")[0]} - March, ${year.split("-")[1]}`}
            </option>
          ))}
        </select>
      </div>

      {/* YTD Summary */}
      <div className="border p-4 my-2  ">
        <span className="font-semibold">YTD Summary</span>
        <div className="overflow-x-auto ">
          <table className="border border-gray-300 min-w-full">
            <thead>
              <tr className="border-b">
                <th className="min-w-[240px] px-4 py-2">Item</th>
                <th className="min-w-[150px] px-4 py-2">Total in Rs.</th>
                {months.map((month) => (
                  <th className="px-4 py-2 min-w-[80px] text-blue-800" key={month}>{month}</th>
                ))}
              </tr>
            </thead>
            <tbody>
  {/* Net Pay Row */}
  <tr className="border-b">
    <td className="py-2 px-4">Net Pay</td>
    <td className="py-2 px-4">
      Rs. {Object.values(mockYtdData).reduce((acc, month) => acc + month.netPay, 0)}
    </td>
    {months.map((month) => (
      <td className="py-2 px-4" key={month}>
        {mockYtdData[month]?.netPay ?? "-"}
      </td>
    ))}
  </tr>

  {/* Income Section */}
  <tr className="border-b bg-gray-100 cursor-pointer" onClick={() => setShowIncome(!showIncome)}>
    <td className="py-2 px-4 flex items-center">
      <ArrowRightIcon className={`transition-transform ${showIncome ? "rotate-90" : ""}`} />
      <span className="ml-2">Income</span>
    </td>
  </tr>
  {showIncome &&
    Object.keys(mockYtdData["April"].income).map((incomeType) => (
      <tr key={incomeType} className="text-sm">
        <td className="py-2 px-10">{incomeType}</td>
        <td className="py-2 px-4">
          Rs. {Object.values(mockYtdData).reduce((acc, month) => acc + month.income[incomeType], 0)}
        </td>
        {months.map((month) => (
          <td className="py-2 px-4" key={month}>
            {mockYtdData[month]?.income[incomeType] ?? "-"}
          </td>
        ))}
      </tr>
    ))}

  {/* Deductions Section */}
  <tr className="border-b bg-gray-100 cursor-pointer" onClick={() => setShowDeductions(!showDeductions)}>
    <td className="py-2 px-4 flex items-center">
      <ArrowRightIcon className={`transition-transform ${showDeductions ? "rotate-90" : ""}`} />
      <span className="ml-2">Deductions</span>
    </td>
  </tr>
  {showDeductions &&
    Object.keys(mockYtdData["April"].deductions).map((deductionType) => (
      <tr key={deductionType} className="text-sm">
        <td className="py-2 px-10">{deductionType}</td>
        <td className="py-2 px-4">
          Rs. {Object.values(mockYtdData).reduce((acc, month) => acc + month.deductions[deductionType], 0)}
        </td>
        {months.map((month) => (
          <td className="py-2 px-4" key={month}>
            {mockYtdData[month]?.deductions[deductionType] ?? "-"}
          </td>
        ))}
      </tr>
    ))}

  {/* Days Section */}
  <tr className="border-b bg-gray-100 cursor-pointer" onClick={() => setShowDays(!showDays)}>
    <td className="py-2 px-4 flex items-center">
      <ArrowRightIcon className={`transition-transform ${showDays ? "rotate-90" : ""}`} />
      <span className="ml-2">Days</span>
    </td>
  </tr>
  {showDays &&
    Object.keys(mockYtdData["April"].days).map((dayType) => (
      <tr key={dayType} className="text-sm">
        <td className="py-2 px-10">{dayType}</td>
        <td className="py-2 px-4">
          {Object.values(mockYtdData).reduce((acc, month) => acc + month.days[dayType], 0)}
        </td>
        {months.map((month) => (
          <td className="py-2 px-4" key={month}>
            {mockYtdData[month]?.days[dayType] ?? "-"}
          </td>
        ))}
      </tr>
    ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default YtdStatement;
