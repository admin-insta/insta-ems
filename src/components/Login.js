import React, { useRef } from "react";
import loginbg from "../components/utils/images/loginbg.png";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { auth } from "../components/utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./store/userSlice";
const Login = () => {
  const email = useRef();
  const password = useRef();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit called");
    console.log(email.current.value, password.current.value);

    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("registred user is", user);
        updateProfile(user, {
          displayName: "Ashish",
          photoURL: "https://avatars.githubusercontent.com/u/112201248?v=4",
        })
          .then(() => {
            const { uid, email, displayName } = auth.currentUser;
            dispatch(
              addUser({ uid: uid, email: email, displayName: displayName })
            );
            // Profile updated!
            // ...
          })
          .catch((error) => {
            //An Error Occured
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("registration fail", errorCode, errorMessage);
        // ..
      });
  };
  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <img className="" alt="background" src={loginbg} />
      </div>
      <div className=" my-4 mx-16 p-8 w-2/5">
        <form className="bg-blue-700 rounded-2xl flex flex-col  justify-center p-4  w-full">
          <span className="text-center text-white font-semibold text-lg">
            <LockOpenIcon sx={{ fontSize: 60 }} />
          </span>

          {/* <input
            className="m-2 p-2 border border-gray-700 rounded-md"
            type="text"
            placeholder=""
            aria-label="Enter Phone Number"

          /> */}
          {/* <label className="text-center text-white">OR</label> */}

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
