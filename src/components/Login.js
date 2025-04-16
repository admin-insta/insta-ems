import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../api/auth";
import { setCookie } from "../cookieStorage/cookie";
import { addUser } from "./store/userSlice"; // Import the Redux action
import loginbg from "../components/utils/images/loginbg.png";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { checkValidateData } from "./utils/validate";
import Shimmer from "../components/shimmer/Shimmer";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux Dispatch
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  const company = useRef();
  const otpValue = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show shimmer before processing

    // Safe retrieval of input values
    const emailValue = email?.current?.value || "";
    const passwordValue = password?.current?.value || "";
    const companyName = company?.current?.value || ""; // Safe check for company input

    if (!emailValue || !passwordValue) {
      toast.error("Please Enter Your Email Id and Password.");
      setLoading(false);
      return;
    }

    // 🔹 Validate Email and Password
    const validateError = checkValidateData(emailValue, passwordValue);
    if (validateError) {
      setErrorMessage(validateError);
      setLoading(false);
      return;
    }

    try {
      let data;
      if (isSignInForm) {
        // 🔹 Login Flow
        data = await login(emailValue, passwordValue);

        if (data?.token) {
          //setCookie("authToken", data.token, 1); // Store token for 1 day      
          // ✅ Dispatch user details to Redux
          dispatch(
            addUser({
              uid: data.user._id,
              email: data.user.email,
              name: data.user.name || "No Name",
              photoUrl: data.user.photoUrl || "",
              firstLogin: data.firstLogin,
            })
          );

          // Navigate based on first login
          navigate(
            data?.firstLogin ? "/userview/updateUser" : "/userview/userHome",
            { replace: true }
          );
          toast.success("Login successful! Welcome User...");
        } else {
          setErrorMessage(
            "Invalid Credentials, Please enter a valid Email and Password."
          );
        }
      } else {
        // 🔹 Signup Flow
        data = await signup(companyName, emailValue, passwordValue);

        if (data?.success) {
          // ✅ Clear input fields only if they exist
          if (email.current) email.current.value = "";
          if (password.current) password.current.value = "";
          if (company.current) company.current.value = "";

          setIsSignInForm(true);
          setErrorMessage(
            "Signup successful! Please Login with Your Credentials..."
          );

          // Redirect to login after success
          setTimeout(() => navigate("/login"), 1500);
        } else {
          setErrorMessage("Signup failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Hide shimmer when async process ends
    }
  };

  return loading ? (
    <Shimmer />
  ) : (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 ">
      {/* Left Side Image - Hidden on Mobile */}
      <div className="hidden md:block md:w-1/2">
        <img
          className="w-full h-screen object-cover"
          alt="background"
          src={loginbg}
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 sm:w-1/2 xs:w-3/4 flex justify-center">
        <form className="bg-blue-700 rounded-2xl flex flex-col p-6 lg:w-full xs:w-1/2 max-w-sm shadow-lg">
          <span className="text-center text-white font-semibold text-lg">
            <LockOpenIcon sx={{ fontSize: 60 }} />
          </span>

          {/* Toggle Sign-in / Sign-up */}
          <div className="p-2 bg-gray-900 rounded-md text-center w-full">
            <span className="text-white text-sm md:text-lg xs:text-xs">
              {isSignInForm
                ? "New here? Sign up to get started! "
                : "Already have an account? "}
              <span
                className="cursor-pointer underline"
                onClick={() => setIsSignInForm(!isSignInForm)}
              >
                Click Here
              </span>
            </span>
          </div>

          {/* Name Input (only for new users) */}

          {!isSignInForm && (
            <>
              <label className="text-white text-xs my-2">Your Name*</label>
              <input
                className="mb-2 p-2 border border-gray-700 rounded-md text-sm md:text-base xs:text-xs"
                type="text"
                placeholder="Your Name"
                ref={company}
              />
            </>
          )}

          {/* Email Input */}
          <label className="text-white text-xs my-2">Email Id *</label>
          <input
            className="p-2 border border-gray-700 rounded-md text-sm md:text-base w-full"
            type="email"
            placeholder="Email Id"
            ref={email}
          />
          {errorMessage === "Email not valid" && (
            <span className="text-white ">
              Email ID is not valid. Please enter a valid email address
            </span>
          )}
          <div className="relative my-2">
            <label className=" text-white text-xs"> Password* </label>
            <input
              className=" p-2 border border-gray-700 rounded-md w-full text-sm md:text-base"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              ref={password}
            />
            <span
              className="absolute right-4 top-7 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>

          {otp && (
            <div>
              <input
                className="my-2 p-2 border border-gray-700 rounded-md w-full text-sm md:text-base"
                type={showPassword ? "text" : "OTP"}
                placeholder="Enter Your OTP"
                ref={otpValue}
              />
            </div>
          )}
          {/* Error Message */}
          {errorMessage && (
            <span className="text-white ">
              {errorMessage === "Email not valid" ? null : errorMessage}
            </span>
          )}

          {/* Forgot Password */}
          <span className="my-2 text-white text-sm md:text-base">
            Forgot Your Password?{" "}
            <span className="cursor-pointer underline hover:text-gray-950">
              Click Here
            </span>
          </span>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="my-2 p-2 lg:text-lg sm:text-xs xs:text-xs bg-gray-900 rounded-md text-white hover:bg-gray-800 transition-all w-full"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
