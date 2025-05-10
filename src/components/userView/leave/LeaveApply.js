import React, { useState } from "react";
import Button from "../../utils/theme/Button";
import Card from "../../utils/theme/Cards";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { leaveApply } from "../../../api/leaves";
import { useDispatch, useSelector } from "react-redux";
import { MdManageAccounts } from "react-icons/md";
import { addLeaves } from "../../store/leaveSlice";
const LeaveApply = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store?.user);
  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    fromEmployeeId: "", // Optionally set this based on logged-in user
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLeaveApply = async (e) => {
    e.preventDefault();

    // Simple validation
    const { leaveType, fromDate, toDate, reason } = leaveData;
    const fromEmployeeId = user?.uid;
    const data = { ...leaveData, fromEmployeeId: fromEmployeeId };
    if (!leaveType || !fromDate || !toDate || !reason) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await leaveApply(data);
      if (response.success) {
        dispatch(addLeaves(response.leaveRequest));
        toast.success("Leave applied successfully!");
      } else {
        toast.error(response.message || "Failed to apply leave");
      }
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Card
      variant="secondary"
      fullScreen="true"
      description={
        <div className="grid grid-cols-12 gap-1 ">         
          <div className="p-2 col-span-10">
            <div className="flex justify-center">
              <div className="flex items-center mb-2">
                <button className="border px-4 py-2 rounded-l-md bg-[#1976d2] text-white text-base">
                  Apply
                </button>
                <button className="border px-4 py-2 bg-white text-base">
                  Pending
                </button>
                {/* <button className="border px-4 py-2 bg-white text-base">
                  Comp Off
                </button> */}
                <button className="border rounded-r-md px-4 py-2 bg-white text-base">
                  History
                </button>
              </div>
            </div>

            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-lg font-semibold mb-4">Applying for Leave</h2>
              <form onSubmit={handleLeaveApply}>
                <div className="gap-6 mb-4">
                  <div className="mb-4">
                    <label className="block text-xs text-blue-700">
                      Leave Type *
                    </label>
                    <select
                      className="border rounded-md p-2 w-1/3"
                      name="leaveType"
                      value={leaveData.leaveType}
                      onChange={handleChange}
                    >
                      <option value="">Select type</option>
                      <option value="casual">Casual Leave</option>
                      <option value="sick">Sick Leave</option>
                      <option value="earned">Earned Leave</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-xs text-blue-700">
                        From Date *
                      </label>
                      <input
                        name="fromDate"
                        value={leaveData.fromDate}
                        type="date"
                        className="border rounded-md p-2 w-full"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-blue-700">
                         Session
                      </label>
                      <select
                        name="session"
                        // value={leaveData.fromDate}                       
                        className="border rounded-md p-2 w-full"
                        onChange={handleChange}
                      >
                        <option>Session 01</option>
                        <option>Session 02</option>
                      </select>

                    </div>
                    <div>
                      <label className="block text-xs text-blue-700">
                        To Date *
                      </label>
                      <input
                        name="toDate"
                        value={leaveData.toDate}
                        type="date"
                        className="border rounded-md p-2 w-full"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-blue-700">
                        Session
                      </label>
                      <select
                        name="session"
                        // value={leaveData.fromDate}                       
                        className="border rounded-md p-2 w-full"
                        onChange={handleChange}
                      >
                        <option>Session 01</option>
                        <option>Session 02</option>
                      </select>

                    </div>
                  </div>
                </div>

                <div className="mb-4">
                
                  <label className=" text-xs text-blue-700 flex items-center">
                  <MdManageAccounts className="h-6 w-6"/> Applying to 
                  </label>
                  <select
                    name="applyingTo"
                    // value={leaveData.applyingTo}
                    type="select"
                    className="border rounded-md p-2 w-1/2"
                    placeholder="Enter name"
                    onChange={handleChange}
                  ><option>Select</option>
                    <option>{user?.name}</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-blue-700">CC to</label>
                  <div className="flex items-center border p-2 rounded-md cursor-pointer">
                    <FaPlus className="text-gray-500 mr-2" /> Add
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-blue-700">
                    Reason *
                  </label>
                  <textarea
                    name="reason"
                    value={leaveData.reason}
                    className="border rounded-md p-2 w-full"
                    placeholder="Enter a reason"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-blue-700">
                    Attach File
                  </label>
                  <input type="file" className="border rounded-md p-2 w-full" />
                </div>

                <div className="flex justify-center gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={handleLeaveApply}
                  >
                    Submit
                  </Button>
                  <Button variant="secondary" type="button">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-span-2 p-2 mt-12 flex flex-col gap-1">
            <Button className=" p-2 rounded-sm bg-">Leave</Button>
            <Button className="bg-white p-2 rounded-sm">Leave Cancel</Button>
            <Button className="bg-white p-2 rounded-sm">Comp Off Grant</Button>
          </div>
        </div>
      }
    />
  );
};

export default LeaveApply;
