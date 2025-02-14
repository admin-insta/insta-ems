import React, { useEffect, useState } from "react";
import docCenter from "../../utils/images/docCenter.png";
import EmployeeList from "../EmployeeList";
import { useSelector } from "react-redux";
import Card from "../../utils/theme/Cards";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
const DocumentCenter = () => {
  const people = useSelector((store) => store.people || []);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (people.length > 0 && !selectedEmployee) {
      setSelectedEmployee(people[0]);
    }
  }, [people, selectedEmployee]);
  return (
    <div className="grid grid-cols-12 gap-4 h-screen">
      {/* Employee List Section */}
      <div className="col-span-3 ">
        <EmployeeList onSelectEmployee={setSelectedEmployee} />
      </div>

      <div className="col-span-9  ">
        <Card
          variant="secondary"
          fullScreen="true"
          title={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ArticleOutlinedIcon /> Document Center
            </span>
          }
          description={
            <div className="p-4">
              <div className="flex justify-between ">
                <div>
                  <h6>We've got it sorted for you!</h6>
                  <p className="text-sm">
                    All Documents are now in one place..
                  </p>
                  <p className="text-sm">
                    You can now request a new letter if you don't find the one
                    you were looking for..
                  </p>
                </div>
                <div>
                  <img className="h-16" alt="my-docs" src={docCenter} />
                </div>
              </div>
              <div className=" my-4   justify-between text-sm gap-2">
                <div className="grid grid-flow-col grid-cols-2 gap-4">
                  <Card
                    variant="primary"
                    description="Documents"
                    // image={docCenter}
                  />
                  <Card variant="primary" description="Payslips" />
                </div>
                <div className=" my-4 flex  justify-between text-sm gap-2">
                  <Card variant="primary" description="Company Policy" />
                  <Card variant="primary" description="Letter Forms" />
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default DocumentCenter;
