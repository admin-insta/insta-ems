import React from "react";
import background from "../components/utils/images/background.jpg";

const MainContainer = () => {
  return (
    <div className=" bg-blue-700 shadow-lg">
      <div className="flex flex-row">
        <img className="w-3/5" alt="background" src={background} />
        {/* <div className='m-4 p-4 text-xl '>Recent Updates</div> */}
        <div className=" w-full ">
          <div className=" mt-10  text-gray-100 text-center p-4 font-semibold">
            <span className="text-3xl"> Simplify Workforce Management</span>{" "}
            <p className="p-4">
              with our All-in-One Solution. Built for Teams of All Sizes,
              designed to make Work Easier and More  Efficient.
            </p>
           
          </div>
          <div className="m-4 flex justify-center">
            <button className="bg-red-600 px-4 py-2 text-white rounded-md font-semibold text-lg">
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
