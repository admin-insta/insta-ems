import React from "react";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';

const UserManager = () => {
  return (
    <div className="flex mx-4">
        
      <div className="m-4 p-4 w-1/2 bg-blue-700 text-white rounded-md shadow-lg hover:bg-blue-900 hover:scale-105 transition-all ease-in-out duration-500">
        <div className="text-white text-2xl  font-semibold text-center"><ManageAccountsIcon sx={{fontSize:64}}/></div>
        <div>
          <div className="font-semibold text-xl mt-4">Without InstaEms</div>
          <ul className="list-inside">
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>Slow approval processes.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span>Hard to track performance.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span>Too much admin work.</span>
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <div className="font-semibold text-lg">With InstaEms</div>
          <ul className="list-inside">
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span>Simplify team management.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span>Easily track attendance, leaves, and performance.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-teal-500"></span>
              <span>Manage shifts and run appraisals on time.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-pink-500"></span>
              <span>Improve team communication.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              <span>Save time, stay organized, and boost productivity.</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="m-4 p-4 w-1/2 rounded-md shadow-lg bg-gray-800 text-white hover:scale-105 duration-500 transition-all ease-in-out  hover:bg-gray-900">
        <div className="text-white text-2xl  font-semibold text-center">
          <GroupIcon sx={{fontSize:64}}/>
        </div>
        <div>
          <div className="font-semibold text-xl mt-4">Without InstaEms</div>
          <ul className="list-inside">
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>Slow approval processes.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span>Hard to track performance.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span>Too much admin work.</span>
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <div className="font-semibold text-lg">With InstaEms</div>
          <ul className="list-inside">
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span>Simplify team management.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span>Easily track attendance, leaves, and performance.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-teal-500"></span>
              <span>Manage shifts and run appraisals on time.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-pink-500"></span>
              <span>Improve team communication.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              <span>Save time, stay organized, and boost productivity.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
