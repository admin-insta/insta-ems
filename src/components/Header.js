import React, { useEffect } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import FitbitIcon from "@mui/icons-material/Fitbit";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "./store/userSlice";
import { auth } from "./utils/firebase";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);

  const handleSignOut =()=>{
    signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/userview");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        
      }
    });

    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, [navigate, dispatch]);

  return  {user}!=null ? (
    <div>
       <button onClick={handleSignOut} className=" font-bold -mt-6 px-2">
            Sign Out - 
          </button>
    </div>
  ) : (
    <div className="grid grid-cols-12 p-2 z-10 sticky top-0 justify-center items-center text-lg bg-blue-700 ">
      {/* Empty div for spacing */}

      <div className="col-span-1">
        <span className="mx-4 ">
          <MenuIcon
            className="hover:scale-110 transition-all ease-in-out hover:shadow-md"
            sx={{ color: "white" }}
          />
        </span>{" "}
        <FitbitIcon
          className="hover:scale-110 transition-all ease-in-out hover:shadow-md"
          sx={{ color: "white" }}
        />
      </div>
      {/* Navigation menu */}
      <ul className="flex  col-span-6  space-x-2 sm:space-x-6 md:space-x-8">
        <Link to="/">
          <li className="text-white font-semibold hover:scale-110 transition-all ease-in-out">
            Home
          </li>
        </Link>

        <li className="text-white font-semibold hover:scale-110 transition-all ease-in-out">
          Services
        </li>
      </ul>
      <ul className="grid grid-flow-col justify-between  col-span-4">
        <li>
          <button className=" px-4 py-1.5 bg-slate-800 text-white rounded-lg hover:scale-110 transition-all ease-in-out">
            Request a Demo
          </button>
        </li>
        <li>
          <Link to="/login">
            <button className=" px-4 py-1.5 bg-slate-800 text-white rounded-lg hover:scale-110 transition-all ease-in-out">
              Login
            </button>
          </Link>
        </li>
        <li>
          <button className=" px-4 py-1.5 bg-slate-800 rounded-lg text-white hover:scale-110 transition-all ease-in-out">
            Sign Up
          </button>
        </li>
      </ul>
      <div className="mx-20">
        {" "}
        <LanguageIcon
          className="hover:scale-110 transition-all ease-in-out hover:shadow-md"
          sx={{ color: "white" }}
        />
      </div>
    </div>
  );
};

export default Header;
