import React, { useEffect, useState } from "react";
import Button from "../../utils/theme/Button";
import { useSelector } from "react-redux";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const PackageInfo = () => {
  const selectedEmployee = useSelector(
    (store) => store?.employee?.selectedEmployee
  );
  const selectedEmployeeSalary = useSelector(
    (store) => store?.salary?.salary?.salary
  );

  const totalEarnings = selectedEmployeeSalary?.salaryStructure?.ctc || 0;
  const monthlyCTC = (totalEarnings / 12).toFixed(2);
  const yearlyCTC = totalEarnings.toFixed(2);

  const [visibleRows, setVisibleRows] = useState({});
  useEffect(() => {
    setVisibleRows({});
  }, [selectedEmployee?._id]);
  const packageDetails = [
    {
      year: 2025,
      monthlyCTC,
      yearlyCTC,
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

  const maskValue = (value, isVisible) =>
    isVisible ? value : "* * * * *";

  return (
    <div className="bg-[#d1cbc1]">
      <div className="border">
        <div className="text-base font-semibold m-2 p-2">
          Package Information of {selectedEmployee?.name}
        </div>
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
            className="flex justify-between items-center m-2 p-2 border rounded-md cursor-pointer bg-white"
          >
            <li>{item.year}</li>
            <li className="flex items-center">
              {visibleRows[item.year] && (
                <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-700" />
              )}
              {maskValue(item.monthlyCTC, visibleRows[item.year])}
            </li>
            <li className="flex items-center">
              {visibleRows[item.year] && (
                <RiMoneyRupeeCircleFill className="h-5 w-5 mr-1 text-gray-700" />
              )}
              {maskValue(item.yearlyCTC, visibleRows[item.year])}
            </li>
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
