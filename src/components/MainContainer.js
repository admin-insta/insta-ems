import React from "react";
import newback from "../components/utils/images/newback.jpg";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./utils/theme/Button";

const MainContainer = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  if (user) {
    return null;
  }
  return (
    <div className="grid col-span-12 grid-flow-col   shadow-lg font-semibold">
      {/*maain background image*/}
      <div className="col-span-8 shadow-inner">
        <img className="lg:inline sm:hidden" alt="background" src={newback} />
      </div>

      {/*main background description*/}
      <div className="col-span-4">
        <div className=" lg:mt-10 md:mt-4 sm:mt-2  text-gray-900 text-center p-4 ">
          <div className="lg:text-3xl md:text-xl sm:text-base">
            Simplify Workforce Management
          </div>
          <div className="lg:p-4 md:p-2 sm:p-1 lg:text-base md:text-sm sm:text-xs xs:text-xs">
            with our All-in-One Solution. Built for Teams of All Sizes, designed
            to make Work Easier and More Efficient.
          </div>
        </div>
        <div className="lg:m-4 md:m-2 sm:m-1 grid  justify-center lg:text-lg  md:text-sm sm:text-xs xs:text-xs hover:scale-105 transition-all ease-in-out">
          <Button
            variant="secondary"
            onClick={() => navigate("/login")}
            // className="bg-[#FF0000] px-4 py-2 text-white rounded-sm  "
          >
            Get Started for Free <EastOutlinedIcon sx={{ color: "white" }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
