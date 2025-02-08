import React, { useEffect, useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import FitbitIcon from "@mui/icons-material/Fitbit";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "./store/userSlice";
import { auth } from "./utils/firebase";
import Button from "../components/utils/theme/Button";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  const [showProduct, setShowProduct] = useState(false);

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
    <div className="grid grid-cols-12  font-nunito   z-10 sticky top-0 justify-center items-center lg:text-base md:text-sm sm:text-xs xs:text-xs   whitespace-nowrap shadow-md bg-white">
      {/* First Menu-Item sidebar and Logo*/}
      <div className="grid grid-flow-col justify-start items-center col-span-6">
        <span className="lg:mx-4 md:mx-2 sm:m-1">
          <MenuIcon
            className="hover:scale-110 transition-all ease-in-out hover:shadow-md"
            sx={{
              fontSize: { lg: 28, md: 24, sm: 20, xs: 16 },
            }}
          />
        </span>
        <span className="lg:mx-4 md:mx-2 sm:m-1">
          <FitbitIcon
            className="hover:scale-110 transition-all ease-in-out hover:shadow-md"
            sx={{
              fontSize: { lg: 28, md: 24, sm: 20, xs: 16 },
            }}
          />
        </span>

        <ul className="grid grid-flow-col justify-start m-2">
          <li
            onClick={() => {
              user ? navigate("/userview") : navigate("/");
            }}
            className="hover:scale-110 transition-all ease-in-out m-2 cursor-pointer"
          >
            Home
          </li>
          <li className=" hover:scale-110 transition-all ease-in-out m-2">
            Resources
          </li>
          <li className=" hover:scale-110 transition-all ease-in-out m-2">
            Pricing
          </li>

          <div
            className="relative"
            onMouseEnter={() => setShowProduct(true)}
            onMouseLeave={() => setShowProduct(false)}
          >
            <li className="group hover:scale-110 transition-all ease-in-out m-2 flex items-center duration-300 cursor-pointer">
              Products
              <ChevronRightOutlinedIcon
                className={`transition-transform duration-5000 ease-in-out transform  ${
                  showProduct ? "rotate-90" : "rotate-0"
                }`}
              />
            </li>

            {/* Show Product Menu */}
            {showProduct && <ProductMenu />}
          </div>
        </ul>
      </div>

      {/* second Menu-Item Language-Icon*/}
      <div className="grid grid-flow-col col-span-6 justify-end">
        <ul className="pt-2 grid grid-flow-col  justify-end items-center">
          <li className=" p-2 hover:scale-105 transition-all ease-in-out ">
            <Button onClick={() => navigate("/demorequest")}>
              Request A Demo
            </Button>
          </li>
          <li className="p-2 hover:scale-105 transition-all ease-in-out ">
            <Button onClick={user ? handleSignOut : handleSignIn}>
              {user ? "Logout" : "Login"}
            </Button>
          </li>
          <li className="p-2">
            {" "}
            <LanguageIcon
              className="hover:scale-110 transition-all ease-in-out hover:shadow-md"
              sx={{
                fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
              }}
            />
            <p className="text-xs  text-center cursor-pointer">EN</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

export const ProductMenu = () => {
  return (
    <div className="absolute top-10 left-0 bg-white shadow-lg p-4 rounded-md w-48 md:w-56 lg:w-64 z-50">
      <ul className="text-sm">
        <li className="p-4 hover:scale-105  transition-all ease-in-out cursor-pointer">
          HRMS
        </li>
        <li className="p-4 hover:scale-105 transition-all ease-in-out  cursor-pointer">
          Payroll System
        </li>
        <li className="p-4 hover:scale-105  transition-all ease-in-out cursor-pointer">
          Leave Management
        </li>
        <li className="p-4 hover:scale-105 transition-all ease-in-out cursor-pointer">
          Attendance Management
        </li>
        <li className="p-4 hover:scale-105 transition-all ease-in-out cursor-pointer">
          Employee Engagement
        </li>
        <li className="p-4 hover:scale-105 transition-all ease-in-out cursor-pointer">
          Performance Management
        </li>
      </ul>
    </div>
  );
};
