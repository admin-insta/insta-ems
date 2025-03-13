import React from "react";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const ItStatement = () => {
  const taxHeaders = [
    { label: "Tax Regime", content: "New Tax Regime", textColor: "text-green-700" },
    { label: "Net Tax" },
    { label: "Total Tax Due" },
    { label: "Tax Charge Monthly" },
    { label: "Remaining Months" },
  ];

  const sections = [
    "A. Income",
    "B. Deductions",
    "C. Perquisites",
    "Income Excluded from Tax",
    "E. Gross Salary",
    "F. Exemption Under Section 10",
  ];

  return (
    <div className="text-black">
      <div className="grid grid-cols-10 gap-1 text-sm">
        {taxHeaders.map((header, index) => (
          <div key={index} className="col-span-2 border bg-white h-24">
            <div className={`border-b border-black p-1 ${header.textColor || ""}`}>{header.label}</div>
            {header.content && <div className="flex justify-center items-center">{header.content}</div>}
          </div>
        ))}
      </div>
      <div className="my-4 text-base">
        {sections.map((section, index) => (
          <div key={index} className="p-2 bg-white my-2 h-12 flex items-center border">
            <ControlPointIcon sx={{ fontSize: 20 }} /> <span className="mx-4">{section}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItStatement;