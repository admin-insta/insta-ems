const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
//Read All Salary Account

export const fetchSalary = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/salary/getSalaryAccount`, {
      mathod: "GET",
      header: {
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
