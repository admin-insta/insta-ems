import React from "react";
import Card from "../../utils/theme/Cards";
import InputField from "../../utils/theme/InputField";
import Button from "../../utils/theme/Button";

const SalaryDescription = () => {
  return (
    <div>
      <Card
        variant="primary"
        fullScreen="true"
        description={
          <form className="grid grid-cols-2 gap-4 ">
            <div className=" border shadow-md p-2 ">
              <div className="flex justify-between items-center m-2">
                <span>Employee Details</span> <Button>Update</Button></div>
              <InputField label="Employee Name" value={"Ashish Kumar"} disabled={true}/>
              <InputField label="Email" type="email" name="email"  value={"ashish.dypcoe@gmail.com"} disabled={true}/>
              <InputField label=" PAN Number " name="PAN Card" value={"BLMPB69226"}/>
              <InputField label=" Bank Account Number" name="Account Number" value={"9182302348762738"} />
              <InputField label=" IFSC Code " name="IFSC Code" value={"UTIB67345"}/>
              <InputField label=" UAN Number " name="UAN Number" value="8273462983648"/>
            </div>
            <div className="border shadow-md p-2">
            <div className="flex justify-between items-center m-2">
            <span>Salary Details</span> <Button>Update</Button></div>
              <InputField label="Net Monthly Salary" name="firstName" value="Rs. 50,000" />
              <InputField label="BASIC Salary" name="BASIC" value="Rs. 30,130" />
              <InputField label=" HRA " name="HRA" value="Rs. 10257" />
              <InputField label=" BONUS " name="BONUS" value="Rs. 7257" />
              <InputField label="Special Allowance" name="Special Allowance"  value="Rs. 1557"/>
              <InputField label="Yealry Salry" name="Yearly Salary" value="Rs. 6,00,000"/>
            </div>
          </form>
        }
      />
    </div>
  );
};

export default SalaryDescription;
