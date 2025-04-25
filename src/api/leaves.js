const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const getLeaves = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/leaves/getAllLeaves`, {
      method: "GET",
      headers: {
        "Content-Type": "applicaton/json",
      },
      credentials: "include",
    });

    const data = response.json();
    if (response.ok) {
      return {
        success: true,
        leaves: data,
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch Salary",
      };
    }
  } catch (error) {
    console.log("Error fetchinf data", error);
    return {
      success: false,
      message: "Something Went Wrong, try again",
    };
  }
};
