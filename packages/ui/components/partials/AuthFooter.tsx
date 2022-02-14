import React from "react";
import { FaUserAlt } from "react-icons/fa";

export const AuthFooter: React.FC = () => {
  return (
    <>
      <div className="block md:flex w-full p-6 space-y-4 md:space-y-0 space-x-4 justify-center items-center bg-green-400">
        <p className="text-xl text-center">Turn Your Passion Into a Business</p>
        <div>
          <button className="flex px-3 py-2 w-44 mx-auto items-center border uppercase bg-white text-sm text-gray-700">
            <FaUserAlt className="w-4 h-4 mr-2" />
            Open a shop
          </button>
        </div>
        <div>
          <button className="flex px-3 py-2 w-44 mx-auto items-center border uppercase bg-black text-sm text-green-400">
            <FaUserAlt className="w-4 h-4 mr-2" />
            Seller login
          </button>
        </div>
      </div>
    </>
  );
};
