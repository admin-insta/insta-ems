import React from "react";
import cities from "../components/utils/images/cities.png";
import firms from "../components/utils/images/firms.png";

import users from "../components/utils/images/users.png";
const InfoCards = () => {
  return (
    <div className=" m-8 grid grid-flow-col col-span-12 justify-around items-center  lg:text-xl md:text-base sm:text-sm font-bold text-gray-800 ">
      {/*City Card*/}
      <div className="col-span-4 m-2 bg-gray-200 rounded-xl flex justify-center flex-col text-center hover:scale-110 duration-500 transition-all ease-in-out hover:bg-gray-400">
        <img className="lg:h-32 md:h-24 sm:h-16" alt="cities" src={cities} />
        <span className="">25+ Cities</span>
      </div>
      {/*Firms Card*/}
      <div className="col-span-4 m-2 p-2 bg-pink-200 rounded-xl flex justify-center flex-col text-center hover:scale-110 transition-all duration-500 ease-in-out hover:bg-pink-400">
        <img className="lg:h-32 md:h-24 sm:h-16 " alt="cities" src={firms} />
        <span className="">1000+ Firms</span>
      </div>
      {/*users Card*/}
      <div className="col-span-4 m-2 bg-teal-400 rounded-xl flex justify-center flex-col  text-center hover:scale-110 transition-all duration-500 ease-in-out hover:bg-emerald-400">
        <img className="lg:h-32 md:h-24 sm:h-16 " alt="cities" src={users} />
        <span className="">2500+ users</span>
      </div>
    </div>
  );
};

export default InfoCards;
