import React, { useState } from "react";
import Button from "../../utils/theme/Button";

const YtdStatement = () => {
  const [selectedYear, setSelectedYear] = useState("2024-2025");

  const financialYears = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];
  const months = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
  ];

  return (
    <div className="shadow-lg bg-white p-4">
      <div className="flex justify-between mb-4 gap-2">
        <div>
          <Button variant="primary">YTD Statement</Button>
        </div>
        <div>
          <Button variant="secondary">Download</Button>
        </div>
      </div>
      <div className="flex justify-end gap-2 mb-4">
        <select
          className="border border-gray-700 p-1 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {financialYears.map((year) => (
            <option key={year} value={year}>{`April, ${
              year.split("-")[0]
            } - March, ${year.split("-")[1]}`}</option>
          ))}
        </select>
      </div>
      <div className="border p-4 my-2">
        <div>
          <span>YTD Summary</span>
          <div className="overflow-x-scroll">
            <table className="border border-gray-300 min-w-full">
              <thead>
                <tr>
                  <th className="border border-gray-300 min-w-[170px] px-4 py-2">
                    Item
                  </th>
                  <th className="border border-gray-300 min-w-[150px] px-4 py-2">
                    Total in Rs.
                  </th>
                  {months.map((month) => (
                    <th
                      className=" px-4 py-2 min-w-[80px] text-blue-800"
                      key={month}
                    >
                      {month}
                    </th>
                  ))}
                </tr>
                <tr className="py-2 px-4">
                    <td className="py-2 px-4">Net pay</td>
                    <td className="py-2 px-4">Rs.8001367</td>
                    <td className="py-2 px-4">65000</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YtdStatement;
