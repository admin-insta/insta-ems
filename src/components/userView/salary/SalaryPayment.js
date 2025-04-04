import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../utils/theme/Button";
import Card from "../../utils/theme/Cards";
import InputField from "../../utils/theme/InputField";
const SalaryPayment = () => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(
    (store) => store?.employee?.selectedEmployee
  );
  const selectedSalary = useSelector((store) => store?.salary?.selectedSalary);

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    try {
      // Placeholder: Integrate with payment gateway API
      console.log(
        `Processing payment of ₹${paymentAmount} for ${selectedEmployee?.name}`
      );

      setPaymentStatus("success");
      // Dispatch action to refresh salary data
      dispatch({ type: "REFRESH_SALARY_DATA" });
    } catch (error) {
      setPaymentStatus("error");
    }
  };

  return (
    <Card
    style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      title="Salary Payment"
      variant="primary"
      description={
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
          <div className="flex justify-between">
            {/* Details Since Last Payment */}
            <div className="mb-4">
              <div className="font-semibold">Details Since Last Payment</div>
              <div>
                <strong>Arrears:</strong> ₹{selectedSalary?.arrears || 0}
              </div>
              <div>
                <strong>Days Worked:</strong> {selectedSalary?.daysWorked || 0}
              </div>
              <div>
                <strong>Unpaid Leaves:</strong>{" "}
                {selectedSalary?.unpaidLeaves || 0}
              </div>
              <div>
                <strong>Reimbursements:</strong> ₹
                {selectedSalary?.reimbursements || 0}
              </div>
            </div>
            {/* Salary Payment Input */}
            <div className="mb-4">
              <label>Salary Payment (₹)</label>
              <InputField
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter amount"
              />
              <div className="my-2 items-end">
                <Button
                  onClick={handlePayment}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg"
                >
                  Proceed to Pay
                </Button>
              </div>
            </div>
          </div>
          {/* Payment CTA */}
          {/* Last Salary Paid */}
          <div className="mb-4">
            <div>
              <strong>Last Salary Paid:</strong> ₹
              {selectedSalary?.lastPaidAmount || "N/A"}
            </div>
            <div>
              <strong>Date:</strong> {selectedSalary?.lastPaidDate || "N/A"}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default SalaryPayment;
