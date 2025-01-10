import React from "react";
import background from "../components/utils/images/background.jpg";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const user = useSelector((store)=>store?.user)
  if(user){
    return null;
  }
  return (
    <div className="grid col-span-12 grid-flow-col  bg-blue-700 shadow-lg">
      {/*maain background image*/}
      <div className="col-span-8">
        <img className="lg:inline sm:hidden" alt="background" src={background} />
      </div>

      {/*main background description*/}
      <div className="col-span-4">
        <div className=" lg:mt-10 md:mt-4 sm:mt-2  text-gray-100 text-center p-4 font-semibold">
          <div className="lg:text-3xl md:text-xl sm:text-base">
            Simplify Workforce Management
          </div>
          <div className="lg:p-4 md:p-2 sm:p-1 lg:text-base md:text-sm sm:text-xs xs:text-xs">
            with our All-in-One Solution. Built for Teams of All Sizes, designed
            to make Work Easier and More Efficient.
          </div>
        </div>
        <div className="lg:m-4 md:m-2 sm:m-1 grid  justify-center">
          <button className="bg-red-600 p-2  text-white rounded-md font-semibold lg:text-lg  md:text-sm sm:text-xs xs:text-xs">
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
