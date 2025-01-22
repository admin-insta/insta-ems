import React, { useRef, useState } from "react";
import loginbg from "../components/utils/images/loginbg.png";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { auth } from "../components/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
const Login = () => {
  const [alreadyUser, setAlreadyUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  console.log(alreadyUser);
  const email = useRef();
  const password = useRef();
  const companyName = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit called");
    console.log(email.current.value, password.current.value);
    //Signup a new user
    if (alreadyUser === true) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("registred user is", user);
          updateProfile(user, {
            displayName: companyName.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/112201248?v=4",
          }).catch((error) => {
            //An Error Occured
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("registration fail", errorCode, errorMessage);
          // ..
        });
    }
    //sign in with an already user
    else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("already user is", user);
          setErrorMessage(null);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("registration fail", errorCode, errorMessage);
          setErrorMessage("Not A Registered user, Please Sign Up");
        });
    }
  };
  return (
    <div className="flex flex-row ">
      <div className="w-1/2">
        <img className="" alt="background" src={loginbg} />
      </div>
      <div className=" my-4 mx-16 p-8 w-2/5">
        <form className="bg-purple-950 rounded-2xl flex flex-col  justify-center p-4  w-full">
          <span className="text-center text-white font-semibold text-lg">
            <LockOpenIcon sx={{ fontSize: 60 }} />
          </span>
          <div className="m-2 p-2 bg-gray-900 rounded-md">
            <span className="text-white mx-2 text-lg">
              New here? Sign up to get started!{" "}
              <span
                className="cursor-pointer underline"
                onClick={() => setAlreadyUser(!alreadyUser)}
              >
                Click Here
              </span>
            </span>
          </div>

          {/* <input
            className="m-2 p-2 border border-gray-700 rounded-md"
            type="text"
            placeholder=""
            aria-label="Enter Phone Number"

          /> */}
          {/* <label className="text-center text-white">OR</label> */}
          {alreadyUser && (
            <input
              className="m-2 p-2 border border-gray-700 rounded-md"
              type="text"
              placeholder="Your Company Name"
              ref={companyName}
            />
          )}
          <input
            className="m-2 p-2 border border-gray-700 rounded-md"
            type="email"
            placeholder="Email Id"
            ref={email}
          />

          <input
            className="mx-2 my-3 p-2 border border-gray-700 rounded-md"
            type="password"
            placeholder="Password"
            ref={password}
          />

          <span className="text-white mx-2">
            Forgot Your Password{" "}
            <span className="cursor-pointer underline hover:text-gray-950">
              Click Here
            </span>
          </span>

          <span className="text-white mx-2 font-bold">{errorMessage}</span>

          <button
            onClick={handleSubmit}
            className="my-4 mx-2 p-2 text-lg   bg-gray-900 rounded-md text-white"
          >
            Sign-In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
