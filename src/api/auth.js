const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const login = async (email, password) => {
    const loginData = { email, password };    
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        return { success: true, token: data.token, user: data.user };
      } else {
        return { success: false, message: "Invalid Credentials" };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: "Something went wrong. Please try again." };
    }
  };
  
//Signup API
  export const signup = async (name, email, password) => {
    const signupData = { name, email, password };
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
  
      const data = await response.json();
  
      if (data.msg === "User registered successfully") {
        return { success: true, message: data.msg }; // Send success message without token
      } else {
        return { success: false, message: data.message || "Signup failed" };
      }
    } catch (error) {
      console.error("Error during signup:", error);
      return { success: false, message: "Something went wrong. Please try again." };
    }
  };


//Signout API
export const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensures cookies are included
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.msg || "Logged out successfully" };
    } else {
      return { success: false, message: data.msg || "Failed to log out" };
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};
