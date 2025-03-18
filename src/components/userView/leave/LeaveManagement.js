import React, { useEffect, useState } from "react";
import Button from "../../utils/theme/Button";
import EmployeeList from "../EmployeeList";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../utils/theme/Cards";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import { setSelectedEmployee } from "../store/employeeSlice";
const LeaveManagement = () => {
  const dispatch= useDispatch()
  const employee = useSelector((store) => store.employee || []); 
  const selectedEmployee = useSelector((store)=>store?.employee?.selectedEmployee)

  useEffect(() => {
    if (employee.length > 0 && !selectedEmployee) {
      dispatch(setSelectedEmployee(employee[0]));
    }
  }, [employee, selectedEmployee]);

  const mockLeaveApplications = [
    {
      applicationId: "LA-1001",
      employeeId: "EMP-1234",
      employeeName: "Ashish Kumar",
      department: "SDE",
      leaveType: "Sick Leave",
      startDate: "2025-02-05",
      endDate: "2025-02-07",
      totalDays: 3,
      status: "Pending",
      reason: "Flu and fever",
      appliedDate: "2025-02-03",
      approvalHistory: [],
    },
    {
      applicationId: "LA-1002",
      employeeId: "EMP-5678",
      employeeName: "Anita Sharma",
      department: "HR",
      leaveType: "Casual Leave",
      startDate: "2025-02-10",
      endDate: "2025-02-12",
      totalDays: 3,
      status: "Approved",
      reason: "Family function",
      appliedDate: "2025-02-01",
      approvalHistory: [
        {
          approver: "HR Manager",
          date: "2025-02-02",
          status: "Approved",
          comments: "Enjoy your leave.",
        },
      ],
    },
    {
      applicationId: "LA-1003",
      employeeId: "EMP-7890",
      employeeName: "Rahul Verma",
      department: "Finance",
      leaveType: "Earned Leave",
      startDate: "2025-02-15",
      endDate: "2025-02-20",
      totalDays: 6,
      status: "Rejected",
      reason: "Personal work",
      appliedDate: "2025-02-01",
      approvalHistory: [
        {
          approver: "Finance Head",
          date: "2025-02-03",
          status: "Rejected",
          comments: "Leave quota exceeded.",
        },
      ],
    },
  ];
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveApplications);

  const handleApprove = (applicationId) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.applicationId === applicationId
          ? {
              ...request,
              status: "Approved",
              approvalHistory: [
                ...request.approvalHistory,
                {
                  approver: "Manager",
                  date: new Date().toISOString().split("T")[0],
                  status: "Approved",
                  comments: "Approved by manager",
                },
              ],
            }
          : request
      )
    );
  };

  const handleReject = (applicationId) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.applicationId === applicationId
          ? {
              ...request,
              status: "Rejected",
              approvalHistory: [
                ...request.approvalHistory,
                {
                  approver: "Manager",
                  date: new Date().toISOString().split("T")[0],
                  status: "Rejected",
                  comments: "Rejected by manager",
                },
              ],
            }
          : request
      )
    );
  };

  return (
    <div className="grid grid-cols-12 gap-2  h-screen border-gray-300 bg-clay-light ">
      {/* Employee List Section */}
      <div className="col-span-3  bg-clay-light ">
        <EmployeeList />
      </div>
      <div className="col-span-9  ">
        <Card
          variant="secondary"
          fullScreen="true"
          title={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <BeachAccessOutlinedIcon /> Leave Information
            </span>
          }
          description={
            <div className="col-span-9 p-2 bg-white shadow-md rounded-md overflow-y-scroll">
              <div className="mb-4 mx-4">Approve Leaves</div>
              <div className="border p-4 mb-2 grid grid-cols-5 text-sm font-semibold bg-gray-100">
                <div className="text-center">Employee Name</div>
                <div className="text-center">Leave Type</div>
                <div className="text-center">Duration</div>
                <div className="text-center">Status</div>
                <div className="text-center">Action</div>
              </div>

              <div>
                {leaveRequests.map((request) => (
                  <div
                    key={request.applicationId}
                    className="border p-4 mb-2 grid grid-cols-5 items-center"
                  >
                    <div className="text-center">
                      <div className="text-base font-medium">
                        {request.employeeName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {request.department}
                      </div>
                    </div>
                    <div className="text-center text-sm">
                      {request.leaveType}
                    </div>
                    <div className="text-center text-sm">
                      {request.startDate} to {request.endDate} (
                      {request.totalDays} days)
                    </div>
                    <div className="text-center text-sm">
                      <p
                        className={
                          request.status === "Approved"
                            ? "text-green-600"
                            : request.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }
                      >
                        {request.status}
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={() => handleApprove(request.applicationId)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleReject(request.applicationId)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default LeaveManagement;
