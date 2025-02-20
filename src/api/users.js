const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials in the request
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, users: data };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch users",
      };
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const addUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials in the request
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, user: data };
    } else {
      return { success: false, message: data.message || "Failed to add user" };
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
