import React from "react";
import track from "../utils/images/track.jpg";
import reviewsbg from "../utils/images/reviewsbg.jpg";
import holidays from "../utils/images/holidays.jpg";
import Button from "../utils/theme/Button";
const UserHome = () => {
  return (
    <div>
      <p className="text-2xl text-gray-600 p-4">Good Evening</p>

      <div className="border rounded-lg bg-gradient-to-r from-clay to-gray-200 h-20 mx-32 flex justify-center items-center">
        <div className="flex text-center p-4 text-lg"> 
        Opening doors to infinite potential.
        </div>
        <div className="text-base"><Button >Explore</Button></div>
      </div>
      <div className="flex flex-row m-4 p-4">
        <div className="m-2 p-4 rounded-lg shadow-md bg-white text-lg w-72">
          Track
          <div className="flex justify-center">
            <img className="h-28" alt="track" src={track} />
          </div>
          <div className="text-gray-700 text-xs p-4">
            "We're good to go! Nothing new to track for now."
          </div>
        </div>

        <div className=" m-2 p-4 rounded-lg shadow-md bg-white text-base w-72">
          Reviews
          <div className="flex justify-center">
            <img className="h-28" alt="track" src={reviewsbg} />
          </div>
          <div className="text-gray-700 text-xs p-4">
            "Hurrah! NWe have nothing to Review."
          </div>
        </div>

        <div className=" m-2 p-4 rounded-lg shadow-md bg-white text-base w-72">
          Upcoming Holiday
          <div className="flex justify-center">
            <img className="h-28" alt="track" src={holidays} />
          </div>
          <div className="text-gray-900 text-base p-4">
            <p>26th JAN</p>
            <p>Republic Day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
