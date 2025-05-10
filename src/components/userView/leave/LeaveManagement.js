import React, { useEffect, useState } from "react";
import Button from "../../utils/theme/Button";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../utils/theme/Cards";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import { getLeaves, leaveApprove } from "../../../api/leaves";
import formatDate from "../../utils/theme/formatDate";
import { SiTicktick } from "react-icons/si";
import { ImCancelCircle } from "react-icons/im";
import { setLeaves, updateLeaves } from "../../store/leaveSlice";
import { toast } from "react-toastify";

const LeaveManagement = () => {
  const [filterStatus, setFilterStatus] = useState("pending");
  const dispatch = useDispatch();
  
  // Directly using leaveData from the Redux store
  const leaveData = useSelector((store) => store?.leave?.leaves);

  useEffect(() => {
    const getAllLeaves = async () => {
      const result = await getLeaves();
      if (result.success) {
        dispatch(setLeaves(result.leaves));
      }
    };
    getAllLeaves();
  }, [dispatch]);

  const getLeaveDuration = (fromDateStr, toDateStr) => {
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);
    if (isNaN(fromDate) || isNaN(toDate)) return 0;
    const diffInMs = toDate.getTime() - fromDate.getTime();
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
  };
  const handleDecision = async (requestId, status) => {
    try {
      const result = await leaveApprove(requestId, status); // assuming API accepts requestId + status
      if (result.success) {
        dispatch(updateLeaves(result.data.updatedLeaveRequest));
        toast.success(`Leave ${status.toLowerCase()} successfully`);
      } else {
        toast.error(`Failed to ${status.toLowerCase()} leave`);
      }
    } catch (error) {
      toast.error("Something went wrong while updating leave status");
      console.error("Leave approval error:", error);
    }
  };

  const filteredLeaves = leaveData.filter(
    (request) => request && request.status && request.status.toLowerCase() === filterStatus.toLowerCase()
  ) || [];

  return (
    <div className="h-screen border-gray-300 bg-clay-light">
      <div>
        <Card
          variant="secondary"
          fullScreen="true"
          description={
            <div className="col-span-9 shadow-md rounded-md">
              <div className="flex items-center justify-between gap-8">
                <div className="font-semibold text-lg flex items-center gap-2">
                  <BeachAccessOutlinedIcon />
                  <span>Leave Information</span>
                </div>
                <div className="flex">
                  {["pending", "approved", "rejected"].map((status, i) => (
                    <button
                      key={status}
                      className={`p-2 text-base ${i === 0 ? "rounded-l-lg" : i === 2 ? "rounded-r-lg" : ""} ${
                        filterStatus === status
                          ? "bg-blue-600 text-white"
                          : "bg-white text-black border"
                      }`}
                      onClick={() => setFilterStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white mt-2 rounded-md p-2">
                <div className="my-2 bg-clay p-2 flex justify-between items-center ">
                  <span className="font-semibold">
                    {filterStatus === "pending"
                      ? "Approve Leaves"
                      : filterStatus === "approved"
                      ? "Approved Leaves"
                      : "Rejected Leaves"}
                  </span>
                  {filterStatus === "pending" && (
                    <span>
                      <button className="flex justify-center items-center bg-blue-600 p-2 text-white rounded-lg text-base ">
                        Accept All
                        <SiTicktick className="mx-2" />
                      </button>
                    </span>
                  )}
                </div>
                <div className="border p-4 mb-2 grid grid-cols-8 text-sm font-semibold bg-gray-100 gap-2">
                  <div className="text-center">Employee Name</div>
                  <div className="text-center">Leave Type</div>
                  <div className="text-center">From Date</div>
                  <div className="text-center">To Date</div>
                  <div className="text-center">Duration</div>
                  <div className="text-center">Status</div>
                  <div className="text-center">Reason</div>
                  {filterStatus === "pending" && (
                    <div className="text-center">Action</div>
                  )}
                </div>

                {filteredLeaves.length === 0 ? (
                  <div className="text-center p-4 text-gray-500">
                    No {filterStatus.toLowerCase()} leave requests.
                  </div>
                ) : (
                  filteredLeaves.map((request) => (
                    <div
                      key={request._id}
                      className="border p-2 mb-2 grid grid-cols-8 items-center gap-2"
                    >
                      <div className="text-center text-base font-medium">
                        {request.fromEmployeeId.name}
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
                              : request.status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </p>
                      </div>
                      <div className="text-center text-sm">
                        {request.reason?.length > 10
                          ? `${request.reason.slice(0, 10)}...`
                          : request.reason}
                      </div>
                      <div className="flex gap-2 justify-center">
                        {filterStatus === "pending" && (
                          <div className="flex gap-2 justify-center">
                            <Button onClick={() => handleDecision(request._id, "approved")}>
                              <SiTicktick />
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => handleDecision(request._id, "rejected")}
                            >
                              <ImCancelCircle />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default LeaveManagement;
