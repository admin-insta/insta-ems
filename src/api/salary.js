const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
//Read All Salary Account

export const fetchSalary = async (employeeId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/salary/getSalaryAccount/${employeeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }, 
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, salary: data };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch Salary",
      };
    }
  } catch (error) {
    console.log("Error Fetching Account deatils", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

//Crate Salary Account Details
export const createSalaryAccount = async (accountDetails) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/salary/createAccountDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(accountDetails),
      }
    );
    const data = await response.json();
    if (response.ok) {
      return { success: true, salaryAccount: data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.log("error while creating salary account", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

//Create Salary from CTC
export const createSalaryFromCtc = async (salaryDetails) => {
  try {
    const response = await fetch(`${BASE_URL}/api/salary/updateSalaryDetailsFromCTC`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials in the request
      body: JSON.stringify(salaryDetails),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, salaryAccount: data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

//Update Bank Account Details
export const updateSalaryAccount = async (accountDetails) => {
  try{
    const response = await fetch(`${BASE_URL}/api/salary/updateAccountDetails`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(accountDetails),
    }); 
    const data = await response.json();
    if (response.ok) {
      return { success: true, salaryAccount: data };
    } else {
      return { success: false, message: data.message || "Failed to update Salary" };
    }
  }catch(error){
    console.log("Error while updating salary account", error);
    return {
      success: false,
      message: "Something went wrong",
    };    
  }}