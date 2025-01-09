import React from "react";
import background from "../components/utils/images/background.jpg";

const MainContainer = () => {
  return (
    <div className="grid col-span-12 grid-flow-col  bg-blue-700 shadow-lg">
      {/*maain background image*/}
      <div className="col-span-8">
        <img className="" alt="background" src={background} />
      </div>

      {/*main background description*/}
      <div className="col-span-4">
        <div className=" mt-10  text-gray-100 text-center p-4 font-semibold">
          <span className="lg:text-3xl md:text-xl sm:text-lg"> Simplify Workforce Management</span>{" "}
          <p className="p-4 lg:text-base md:text-sm sm:text-xs">
            with our All-in-One Solution. Built for Teams of All Sizes, designed
            to make Work Easier and More Efficient.
          </p>
        </div>
        <div className="m-4 grid  justify-center">
          <button className="bg-red-600 px-4 py-2 text-white rounded-md font-semibold lg:text-lg  md:text-sm sm:text-xs">
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
