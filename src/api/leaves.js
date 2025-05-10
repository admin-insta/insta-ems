const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const getLeaves = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/leave/getAllLeaveRequests`, {
      method: "GET",
      headers: {
        "Content-Type": "applicaton/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      return {
        success: true,
        leaves: data.leaveRequests,
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

export const leaveApply = async (data) => {
  console.log("leave apply api");
  try {
    const response = await fetch(
      `${BASE_URL}/api/leave/sendLeaveRequest/pending/67da6d5a50f84202ae4b6859`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    const apiData = await response.json();
    if (response.ok) {
      return { success: true, leave: apiData };
    } else {
      return {
        success: false,
        message: apiData.message || "failed to apply leave",
      };
    }
  } catch (error) {
    console.log("something went wrong");
    return {
      success: false,
      message: "something went wrong, please try again",
    };
  }
};

export const leaveApprove = async (requestId, status)=>{
  try{
    const response = await fetch(`${BASE_URL}/api/leave/approveLeaveRequest/${status}/${requestId}`,
     { method:"PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
    )
    const apiData = await response.json()
    if (response.ok){
      return{success:true, data:apiData}
    }else{
      return{success:false, message: apiData.message || "failed to apply leave"}
    }

  }catch(error){
    console.log("something went wrong")
    return{
      success:false,
      message:"something went wrong, please try again"
    }
  }
}
