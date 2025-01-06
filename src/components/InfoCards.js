import React from "react";
import cities from "../components/utils/images/cities.png";
import firms from "../components/utils/images/firms.png";

import users from "../components/utils/images/users.png";
const InfoCards = () => {
  return (
    <div className="p-4  my-4 flex justify-around items-center">
      <div className=" bg-gray-200 rounded-xl px-10 py-4 text-center hover:scale-110 duration-500 transition-all ease-in-out hover:bg-gray-400">
        <img className="h-32 " alt="cities" src={cities} />
        <span className="text-xl font-bold text-gray-800 ">25+ Cities</span>
      </div>
      <div className="bg-pink-200 rounded-xl px-10 py-4 text-center hover:scale-110 transition-all duration-500 ease-in-out hover:bg-pink-400">
        <img className="h-32 " alt="cities" src={firms} />
        <span className="text-xl font-bold text-gray-800 ">10000 + Firms</span>
      </div>
      <div className=" bg-emerald-200 rounded-xl px-14 py-4 text-center hover:scale-110 transition-all duration-500 ease-in-out hover:bg-emerald-400">
        <img className="h-32 " alt="cities" src={users} />
        <span className="text-xl font-bold text-gray-800 ">250000 + Users</span>
      </div>
    </div>
  );
};

export default InfoCards;
