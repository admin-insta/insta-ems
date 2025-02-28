const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
//Read All the Emoloyee
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/getAllUsers`, {
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


//Create a new employee
export const addUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/createUser`, {
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

//Delete an Employee    
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/deleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials in the request
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, updatedUsers: data };
    } else {
      return { success: false, message: data.message || "Failed to delete user" };
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const updateUser = async (id, userData) => { 
  try {
    const response = await fetch(`${BASE_URL}/api/users/updateUser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials in the request
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message || "Failed to update user" };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

