import React from "react";
import cities from "../components/utils/images/cities.png";
import firms from "../components/utils/images/firms.png";

import users from "../components/utils/images/users.png";
const InfoCards = () => {
  return (
    <div className="p-4 lg:mx-16 md:mx-8 sm:mx-2 my-4 grid grid-flow-col justify-around items-center lg:text-xl md:text-base sm:text-sm font-bold text-gray-800 ">
      {/*City Card*/}
      <div className=" bg-gray-200 rounded-xl px-10 py-4 text-center hover:scale-110 duration-500 transition-all ease-in-out hover:bg-gray-400">
        <img className="lg:h-32 md:h-24 sm:h-16" alt="cities" src={cities} />
        <span className="">25+ Cities</span>
      </div>
      {/*Firms Card*/}
      <div className="bg-pink-200 rounded-xl px-10 py-4 text-center hover:scale-110 transition-all duration-500 ease-in-out hover:bg-pink-400">
        <img className="lg:h-32 md:h-24 sm:h-16 " alt="cities" src={firms} />
        <span className="">10000 + Firms</span>
      </div>
      {/*User Card*/}
      <div className=" bg-emerald-200 rounded-xl lg:px-14 md:px-10 sm:px-8 py-4 text-center hover:scale-110 transition-all duration-500 ease-in-out hover:bg-emerald-400">
        <img className="lg:h-32 md:h-24 sm:h-16 " alt="cities" src={users} />
        <span className="">250000 + Users</span>
      </div>
    </div>
  );
};

export default InfoCards;
