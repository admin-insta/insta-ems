// /src/api/auth.js

export const login = async (email, password) => {
    const loginData = { email, password };
    
    try {
      const response = await fetch("https://instaems-backend.onrender.com/api/auth/login", {
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
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: "Something went wrong. Please try again." };
    }
  };
  