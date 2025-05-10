import React, { useEffect, useState } from "react";
import docimage from "../../utils/images/docimage.jpg";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../utils/theme/Cards";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { setSelectedEmployee } from "../../store/employeeSlice";
import { MdOutlinePolicy } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { LiaCcAmazonPay } from "react-icons/lia";
import { GrDocument } from "react-icons/gr";
import { SlEnvolopeLetter } from "react-icons/sl";
import Button from "../../utils/theme/Button";
const DocumentCenter = () => {
  const dispatch = useDispatch();
  const employee = useSelector((store) => store.employee || []);
  const selectedEmployee = useSelector(
    (store) => store?.employee?.selectedEmployee
  );

  useEffect(() => {
    if (employee.length > 0 && !selectedEmployee) {
      dispatch(setSelectedEmployee(employee[0]));
    }
  }, [employee, selectedEmployee]);
  return (
    <div className="grid grid-cols-12 gap-4 h-screen">
      {/* Employee List Section */}
      {/* <div className="col-span-3 ">
        <EmployeeList />
      </div> */}

      <div className="col-span-12  ">
        <Card
          variant="primary"
          fullScreen="true"
          title={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ArticleOutlinedIcon /> Document Center
            </span>
          }
          description={
            <div className="p-2 bg-[#d1cbc1]">
              <div className="flex justify-between bg-white p-4 ">
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
                  <img className="h-24" alt="my-docs" src={docimage} />
                </div>
              </div>
              <div className=" my-4 grid grid-flow-row grid-cols-12  gap-2 text-lg">
                <div className=" bg-white py-2 px-2 col-span-4 flex justify-between items-center"><span className="flex items-center"><GrDocument/> Document</span><span><Button variant="primary">View All</Button></span></div>
                <div className=" bg-white py-2 px-2 col-span-4 flex justify-between items-center"><span className="flex items-center"><LiaCcAmazonPay/> Payslips</span><span><Button variant="primary">View All</Button></span></div>
                <div className=" bg-white py-2 px-2 col-span-4 flex justify-between items-center"><span className="flex items-center"><FaWpforms/> Forms</span><span><Button variant="primary">View All</Button></span></div>
                                      
              </div>
              <div className=" my-4 grid grid-flow-row grid-cols-12  gap-2 text-lg">
                <div className=" bg-white py-2 px-2 col-span-4 flex justify-between items-center"><span className="flex items-center"><TiDocumentText/> Form 16</span><span><Button variant="primary">View All</Button></span></div>                 
                <div className=" bg-white py-2 px-2 col-span-4 flex justify-between items-center"><span className="flex items-center"><SlEnvolopeLetter/> Letters</span><span><Button variant="primary">View All</Button></span></div>
                <div className=" bg-white py-2 px-2 col-span-4 flex justify-between items-center"><span className="flex items-center"><MdOutlinePolicy/> Company Policy</span><span><Button variant="primary">View All</Button></span></div>
                 
              </div>
             

            </div>
          }
        />
      </div>
    </div>
  );
};

export default DocumentCenter;
