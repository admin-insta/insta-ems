import React from "react";
import Button from "../../utils/theme/Button";
import Card from "../../utils/theme/Cards";
import { FaPlus } from "react-icons/fa";

const LeaveApply = () => {
  return (
    <Card
      variant="secondary"
      fullScreen="true"
      description={
        <div className="grid grid-cols-12 gap-1">
            <div className="col-span-2 text-sm mt-14">
                <div className="underline pt-1">Leave</div>
                <div className="pt-1">Leave Cancel</div>
                <div className="pt-1">Comp Off Grant</div>
            </div>
          <div className="p-2 col-span-10">
            <div className="flex justify-center items-center mb-2">
              <button className="border px-4 py-2 rounded-l-md bg-[#1976d2] text-white text-base">
                Apply
              </button>
              <button className="border px-4 py-2 bg-white text-base">
                Pending
              </button>
              <button className="border rounded-r-md px-4 py-2 bg-white text-base">
                History
              </button>
            </div>

            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-lg font-semibold mb-4">Applying for Leave</h2>
              <form>
                <div className=" gap-6 mb-4">
                  <div className="mb-4">
                    <label className="block text-xs text-blue-700">
                      Leave Type *
                    </label>
                    <select className="border rounded-md p-2 w-1/3">
                      <option>Select type</option>
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
                        type="date"
                        className="border rounded-md p-2 w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-blue-700">
                        To Date *
                      </label>
                      <input
                        type="date"
                        className="border rounded-md p-2 w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-blue-700">
                    Applying to
                  </label>
                  <input
                    type="text"
                    className="border rounded-md p-2 w-full"
                    placeholder="Enter name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-blue-700">CC to</label>
                  <div className="flex items-center border p-2 rounded-md cursor-pointer">
                    <FaPlus className="text-gray-500 mr-2" /> Add
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-blue-700">
                    Contact Details
                  </label>
                  <input
                    type="text"
                    className="border rounded-md p-2 w-full"
                    placeholder="Enter details"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-blue-700">Reason</label>
                  <textarea
                    className="border rounded-md p-2 w-full"
                    placeholder="Enter a reason"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-blue-700">
                    Attach File
                  </label>
                  <input type="file" className="border rounded-md p-2 w-full" />
                </div>

                <div className="flex justify-center gap-2">
                  <Button variant="primary">Submit</Button>
                  <Button variant="secondary">Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default LeaveApply;
