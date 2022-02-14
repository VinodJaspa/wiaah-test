import React, { useContext } from "react";
import { SidebarContext } from "../helpers/SidebarContext";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaAlignJustify,
  FaChevronDown,
} from "react-icons/fa";
import { Sidebar } from "../blocks";
import Link from "next/link";

let menup = [
  {
    label: "Clothing",
    url: "",
    children: [
      {
        label: "Women's",
        url: "",
        children: [
          {
            label: "Dresses",
            url: "/category/dresses",
          },
          {
            label: "Shirts",
            url: "/category/shirts",
          },
        ],
      },
      {
        label: "Men's",
        url: "/category/mens",
      },
    ],
  },
  {
    label: "Home & Living",
    url: "/category/home-and-living",
  },
];

export const Header: React.FC = () => {
  const sidebar = useContext(SidebarContext);

  return (
    <>
      <nav className="hidden w-full lg:block">
        {/* Top Navbar */}
        <div className="flex w-full items-center justify-between bg-black px-6 py-2">
          <div className="h-20 w-44 cursor-pointer">
            <Link href="/">
              <img
                alt="wiaah_logo"
                src="/wiaah_logo.png"
                className="h-full w-full object-cover"
              />
            </Link>
          </div>
          <div className="flex h-12">
            <input
              className="w-60 appearance-none rounded-l-lg border-r border-gray-600 bg-gray-700 px-2.5 py-1.5 text-white focus:outline-none"
              placeholder="Search"
            />
            <label htmlFor="Category" className="relative flex">
              <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
              <select
                className="w-60 appearance-none border-l border-gray-600 bg-gray-700 px-2.5 py-1.5 text-white focus:outline-none"
                placeholder="Category"
              >
                <option>Category</option>
                <option>Dress</option>
                <option>Jewelry</option>
                <option>Clothing</option>
                <option>Shoes</option>
              </select>
            </label>
            <button className="rounded-r-lg bg-green-400 px-2.5 py-1.5">
              <FaSearch className="h-5 w-5 text-white" />
            </button>
          </div>
          <div className="flex text-white">
            <ul className="inline-flex items-center space-x-9">
              <li className="flex cursor-pointer items-center text-sm">
                <Link href="/login">
                  <div>
                    Sign In <FaUser className="ml-0 inline-flex h-8 w-8" />
                  </div>
                </Link>
              </li>
              <li className="cursor-pointer">
                <FaHeart className="h-8 w-8" />
              </li>
              <li className="relative flex cursor-pointer">
                <FaShoppingBag className="h-8 w-8" />
                <div className="absolute -bottom-2 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 p-2 text-xs">
                  3
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-full bg-gray-800 px-6 py-4 text-white">
          <ul className="inline-flex items-center space-x-10">
            <li
              id="burger-menu-toggle"
              className="flex cursor-pointer items-center space-x-2"
              onClick={() => {
                sidebar?.toggleVisibility();
              }}
            >
              <FaAlignJustify className="h-4 w-4" />
              <span className="inline-flex">All</span>
            </li>
            {[...Array(1)].map((_, i: number) => (
              <React.Fragment key={i}>
                <li className="cursor-pointer">Dress</li>
                <li className="cursor-pointer">Jewelry</li>
                <li className="cursor-pointer">Clothing</li>
                <li className="cursor-pointer">Shoes</li>
                <li className="cursor-pointer">Accessories</li>
                <li className="cursor-pointer">Dress</li>
                <li className="cursor-pointer">Jewelry</li>
                <li className="cursor-pointer">Clothing</li>
                <li className="cursor-pointer">Shoes</li>
                <li className="cursor-pointer">Accessories</li>
                <li className="cursor-pointer">Shoes</li>
                <li className="cursor-pointer">Accessories</li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="block w-full space-y-6 bg-gray-800 p-6 lg:hidden">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaAlignJustify
              className="h-5 w-5 cursor-pointer text-white"
              onClick={() => {
                sidebar?.toggleVisibility();
              }}
            />
            <p className="text-lg font-black text-green-300">Wiaah</p>
          </div>
          <div className="flex">
            <ul className="inline-flex space-x-4 text-white">
              <li className="cursor-pointer">
                <FaHeart className="h-5 w-5" />
              </li>
              <li className="relative flex cursor-pointer">
                <FaShoppingBag className="h-5 w-5" />
                <div className="absolute -bottom-2 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 p-2 text-xs">
                  3
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex h-12 w-full justify-center">
          <input
            className="w-48 appearance-none rounded-l-lg border-r border-gray-600 bg-gray-700 px-2.5 py-1.5 text-white focus:outline-none md:w-72"
            placeholder="Search"
          />
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
            <select
              className="w-28 appearance-none border-l border-gray-600 bg-gray-700 px-2.5 py-1.5 text-white focus:outline-none md:w-60"
              placeholder="Category"
            >
              <option>Category</option>
              <option>Dress</option>
              <option>Jewelry</option>
              <option>Clothing</option>
              <option>Shoes</option>
            </select>
          </label>
          <button className="rounded-r-lg bg-green-400 px-2.5 py-1.5">
            <FaSearch className="h-5 w-5 text-white" />
          </button>
        </div>
      </nav>

      <Sidebar menu={menup} />
    </>
  );
};
