const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const uploadProfilePicture = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
  
      const response = await fetch(`${BASE_URL}/api/users/upload-profile`, {
        method: "POST",
        body: formData,
        credentials: "include", // important!
      });
  
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const data= await response.json();
      // return await response.json();
      if(response.ok){
        return data
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      throw error;
    }
  };
  