import React, { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaAlignJustify,
  FaChevronDown,
} from "react-icons/fa";
import { Sidebar } from "../blocks";

export const Header: React.FC = () => {
  let [visible, setVisible] = useState<boolean>(false);

  const closeSidebar = () => {
    setVisible(false);
  };

  return (
    <>
      <nav className="hidden lg:block w-full">
        {/* Top Navbar */}
        <div className="flex w-full px-6 py-2 justify-between items-center bg-black">
          <div className="w-44 h-20 cursor-pointer">
            <img
              alt="wiaah_logo"
              src="/wiaah_logo.png"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex h-12">
            <input
              className="px-2.5 py-1.5 w-60 rounded-l-lg border-r bg-gray-700 border-gray-600 text-white appearance-none focus:outline-none"
              placeholder="Search"
            />
            <label htmlFor="Category" className="relative flex">
              <FaChevronDown className="text-green-400 pointer-events-none w-4 h-4 absolute inset-y-1/3 right-3" />
              <select
                className="px-2.5 py-1.5 w-60 border-l bg-gray-700 border-gray-600 text-white appearance-none focus:outline-none"
                placeholder="Category"
              >
                <option>Category</option>
                <option>Dress</option>
                <option>Jewelry</option>
                <option>Clothing</option>
                <option>Shoes</option>
              </select>
            </label>
            <button className="px-2.5 py-1.5 rounded-r-lg bg-green-400">
              <FaSearch className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex text-white">
            <ul className="inline-flex space-x-4 items-center">
              <li className="flex items-center text-sm cursor-pointer">
                Sign In <FaUser className="inline-flex ml-2 w-6 h-6" />
              </li>
              <li className="cursor-pointer">
                <FaHeart className="w-6 h-6" />
              </li>
              <li className="flex relative cursor-pointer">
                <FaShoppingBag className="w-6 h-6" />
                <div className="flex p-2 w-3 h-3 justify-center items-center bg-red-500 rounded-full absolute -bottom-2 -right-1 text-xs">
                  3
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-full bg-gray-800 px-6 py-4 text-white">
          <ul className="inline-flex space-x-4 items-center">
            <li
              className="cursor-pointer"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              <FaAlignJustify className="w-4 h-4" />
            </li>
            {[...Array(3)].map((_, i: number) => (
              <React.Fragment key={i}>
                <li className="cursor-pointer">Dress</li>
                <li className="cursor-pointer">Jewelry</li>
                <li className="cursor-pointer">Clothing</li>
                <li className="cursor-pointer">Shoes</li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="block lg:hidden p-6 w-full space-y-6 bg-gray-800">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center space-x-4">
            <FaAlignJustify className="w-5 h-5 text-white cursor-pointer" />
            <p className="text-lg font-black text-green-300">Wiaah</p>
          </div>
          <div className="flex">
            <ul className="inline-flex space-x-4 text-white">
              <li className="cursor-pointer">
                <FaHeart className="w-5 h-5" />
              </li>
              <li className="flex relative cursor-pointer">
                <FaShoppingBag className="w-5 h-5" />
                <div className="flex p-2 w-3 h-3 justify-center items-center bg-red-500 rounded-full absolute -bottom-2 -right-1 text-xs">
                  3
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex w-full h-12 justify-center">
          <input
            className="px-2.5 py-1.5 w-48 rounded-l-lg border-r bg-gray-700 border-gray-600 text-white appearance-none focus:outline-none"
            placeholder="Search"
          />
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="text-green-400 pointer-events-none w-4 h-4 absolute inset-y-1/3 right-3" />
            <select
              className="px-2.5 py-1.5 w-28 border-l bg-gray-700 border-gray-600 text-white appearance-none focus:outline-none"
              placeholder="Category"
            >
              <option>Category</option>
              <option>Dress</option>
              <option>Jewelry</option>
              <option>Clothing</option>
              <option>Shoes</option>
            </select>
          </label>
          <button className="px-2.5 py-1.5 rounded-r-lg bg-green-400">
            <FaSearch className="w-5 h-5 text-white" />
          </button>
        </div>
      </nav>

      <Sidebar visible={visible} close={closeSidebar} />
    </>
  );
};
