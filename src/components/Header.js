import React, { useEffect } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import FitbitIcon from "@mui/icons-material/Fitbit";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "./store/userSlice";
import { auth } from "./utils/firebase";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);

  //Login
  const handleSignIn = () => {
    navigate("/login");
  };
  //SignOut
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser()); // Clear user from Redux store
      })
      .catch((error) => {
        console.error("Error during sign out:", error.message);
      });
  };

  //On auth state changed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            name: displayName,
            photoUrl: photoURL,
          })
        );
        // Navigate to /userview only if not already on it
        navigate("/userview");
      } else {
        dispatch(removeUser());
        navigate("/");
        // Navigate to login only if not already on it
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  return (
    <div className="grid grid-cols-12  z-10 sticky top-0 justify-center items-center lg:text-base md:text-sm sm:text-xs xs:text-xs bg-blue-700 font-semibold whitespace-nowrap">
      {/* First Menu-Item sidebar and Logo*/}
      <div className="grid grid-flow-col justify-start items-center col-span-6">
        <span className="lg:mx-4 md:mx-2 sm:m-1">
          <MenuIcon
            className="hover:scale-110 transition-all ease-in-out hover:shadow-md"
            sx={{
              color: "white",
              fontSize: { lg: 28, md: 24, sm: 20, xs: 16 },
            }}
          />
        </span>
        <span className="lg:mx-4 md:mx-2 sm:m-1">
          <FitbitIcon
            className="hover:scale-110 transition-all ease-in-out hover:shadow-md"
            sx={{
              color: "white",
              fontSize: { lg: 28, md: 24, sm: 20, xs: 16 },
            }}
          />
        </span>

        <ul className="grid grid-flow-col justify-start m-2">
          <li
            onClick={() => {
              user ? navigate("/userview") : navigate("/");
            }}
            className="text-white  hover:scale-110 transition-all ease-in-out m-2 cursor-pointer"
          >
            Home
          </li>

          <li className="text-white hover:scale-110 transition-all ease-in-out m-2">
            Services
          </li>
        </ul>
      </div>

      {/* second Menu-Item Language-Icon*/}
      <div className="grid grid-flow-col col-span-6 justify-end items-center">
        <ul className="grid grid-flow-col justify-end">
          <li>
            <button
              onClick={() => navigate("/demorequest")}
              className="p-2  m-2 bg-slate-800 text-white rounded-lg hover:scale-110 transition-all ease-in-out "
            >
              Request A Demo
            </button>
          </li>
          <li>
            <button
              onClick={user ? handleSignOut : handleSignIn}
              className="p-2 m-2 bg-slate-800 text-white rounded-lg hover:scale-110 transition-all ease-in-out"
            >
              {user ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
        <div className="m-2">
          <LanguageIcon
            className="hover:scale-110 transition-all ease-in-out hover:shadow-md"
            sx={{
              color: "white",
              fontSize: { xs: 16, sm: 20, md: 24, lg: 28 },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
