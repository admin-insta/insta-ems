import React, { useState } from "react";
import Button from "../../utils/theme/Button";

const PackageInfo = () => {
  const [visibleRows, setVisibleRows] = useState({});

  const packageDetails = [
    {
      year: 2025,
      monthlyCTC: "₹60,000",
      yearlyCTC: "₹7,20,000",
      proration: "90%",
    },
    {
      year: 2024,
      monthlyCTC: "₹55,000",
      yearlyCTC: "₹6,60,000",
      proration: "95%",
    },
   
    {
      year: 2023,
      monthlyCTC: "₹50,000",
      yearlyCTC: "₹6,00,000",
      proration: "100%",
    },
  ];

  const toggleVisibility = (year) => {
    setVisibleRows((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const maskValue = (value, isVisible) => (isVisible ? value : "*****");

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Package Information</h2>
      <div>
        <ul className="flex justify-between m-2 p-2 border-b border-black font-semibold">
          <li>Year</li>
          <li>Monthly CTC</li>
          <li>Yearly CTC</li>
          <li>CTC Proration</li>
          <li>View</li>
        </ul>
        {packageDetails.map((item) => (
          <ul
            key={item.year}
            className="flex justify-between items-center m-2 p-2 border border-gray-300 rounded-md cursor-pointer"
          >
            <li>{item.year}</li>
            <li>{maskValue(item.monthlyCTC, visibleRows[item.year])}</li>
            <li>{maskValue(item.yearlyCTC, visibleRows[item.year])}</li>
            <li>{maskValue(item.proration, visibleRows[item.year])}</li>
            <li>
              <Button onClick={() => toggleVisibility(item.year)}>
                {visibleRows[item.year] ? "Hide" : "Show"}
              </Button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default PackageInfo;
