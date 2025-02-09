import React, { useRef, useState } from "react";
import loginbg from "../components/utils/images/loginbg.png";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [alreadyUser, setAlreadyUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const email = useRef();
  const password = useRef();
  const companyName = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const response = await login(emailValue, passwordValue);

    if (response.success) {
      navigate("/userview");
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      {/* Left Side Image - Hidden on Mobile */}
      <div className="hidden md:block md:w-1/2">
        <img
          className="w-full h-screen object-cover"
          alt="background"
          src={loginbg}
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex justify-center">
        <form className="bg-blue-700 rounded-2xl flex flex-col p-6 w-full max-w-sm shadow-lg">
          <span className="text-center text-white font-semibold text-lg">
            <LockOpenIcon sx={{ fontSize: 60 }} />
          </span>

          {/* Toggle Sign-in / Sign-up */}
          <div className=" p-2 bg-gray-900 rounded-md text-center w-full">
            <span className="text-white text-sm md:text-lg">
              {alreadyUser
                ? "Already have an account? "
                : "New here? Sign up to get started! "}
              <span
                className="cursor-pointer underline"
                onClick={() => setAlreadyUser(!alreadyUser)}
              >
                Click Here
              </span>
            </span>
          </div>

          {/* Company Name Input (only for new users) */}
          {alreadyUser && (
            <input
              className="my-2 p-2 border border-gray-700 rounded-md text-sm md:text-base"
              type="text"
              placeholder="Your Company Name"
              ref={companyName}
            />
          )}

          {/* Email Input */}
          <input
            className=" my-2 p-2 border border-gray-700 rounded-md text-sm md:text-base w-full"
            type="email"
            placeholder="Email Id"
            ref={email}
          />

          {/* Password Input */}
          <div className="relative">
            <input
              className="my-2  p-2 border border-gray-700 rounded-md w-full text-sm md:text-base"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              ref={password}
            />
            <span
              className="absolute right-4 top-4 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>

          {/* Forgot Password */}
          <span className="my-2 text-white text-sm md:text-base">
            Forgot Your Password?{" "}
            <span className="cursor-pointer underline hover:text-gray-950">
              Click Here
            </span>
          </span>

          {/* Error Message */}
          {errorMessage && (
            <span className="text-red-400 text-sm mx-2">{errorMessage}</span>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="my-2 p-2 text-lg bg-gray-900 rounded-md text-white hover:bg-gray-800 transition-all w-full"
          >
            {alreadyUser ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
