import React, { useEffect, useState } from "react";
import Button from "../../utils/theme/Button";
import EmployeeList from "../EmployeeList";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../utils/theme/Cards";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import { setSelectedEmployee } from "../../store/employeeSlice";
import { getLeaves } from "../../../api/leaves";
import formatDate from "../../utils/theme/formatDate";
import { SiTicktick } from "react-icons/si";
import { ImCancelCircle } from "react-icons/im";
const LeaveManagement = () => {
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

  useEffect(() => {
    const getAllLeaves = async () => {
      const result = await getLeaves();
      console.log("leave result", result.leaves);
      setLeaveRequests(result.leaves);
    };
    getAllLeaves();
  }, []);

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
  const [leaveRequests, setLeaveRequests] = useState([]);
  const getLeaveDuration = (fromDateStr, toDateStr) => {
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);

    // Ensure dates are valid
    if (isNaN(fromDate) || isNaN(toDate)) return 0;

    // Calculate time difference in milliseconds
    const diffInMs = toDate.getTime() - fromDate.getTime();

    // Convert to days and add 1 to include both start and end date
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
  };

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
    <div className="  h-screen border-gray-300 bg-clay-light ">
      <div className=" ">
        <Card
          variant="secondary"
          fullScreen="true"
          title={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <BeachAccessOutlinedIcon /> Leave Information
            </span>
          }
          description={
            <div className="col-span-9 p-2 bg-white shadow-md rounded-md  ">
              <div className="mb-4 mx-4">Approve Leaves</div>
              <div className="border p-4 mb-2 grid grid-cols-8 text-sm font-semibold bg-gray-100 gap-2">
                <div className="text-center">Employee Name</div>
                <div className="text-center">Leave Type</div>
                <div className="text-center">From Date </div>
                <div className="text-center">To Date </div>
                <div className="text-center">Duration</div>
                <div className="text-center">Status</div>
                <div className="text-center">Reason</div>
                <div className="text-center">Action</div>
              </div>

              <div>
                {leaveRequests.map((request) => (
                  <div
                    key={request._id}
                    className="border p-2 mb-2 grid grid-cols-8 items-center gap-2"
                  >
                    <div className="text-center">
                      <div className="text-base font-medium">
                        {request.fromEmployeeId.name}
                      </div>
                    </div>
                    <div className="text-center text-sm">
                      {request.leaveType}
                    </div>
                    <div className="text-center font-medium">
                      {formatDate(request.fromDate)}
                    </div>
                    <div className="text-center font-medium">
                      {formatDate(request.toDate)}
                    </div>

                    <div className="text-center text-sm">
                      {getLeaveDuration(request.fromDate, request.toDate)}
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
                        {request.status === "pending" ? "Pending" : "Rejected"}
                      </p>
                    </div>
                    <div className="text-center text-sm">
                      {request.reason?.length > 10
                        ? `${request.reason.slice(0, 10)}...`
                        : request.reason}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={() => handleApprove(request.applicationId)}
                      >
                        <SiTicktick/>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleReject(request.applicationId)}
                      >
                        <ImCancelCircle/>
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
