import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Card, ImageCard, Divider } from "../../components";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

export const HomeView: React.FC = () => {
  return (
    <>
      <div className="block p-6 space-y-6 w-full">
        <div className="grid w-full p-4 rounded-lg grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-green-400">
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="text-green-400 pointer-events-none w-4 h-4 absolute inset-y-1/3 right-3" />
            <select
              className="px-2.5 py-2 w-full rounded appearance-none focus:outline-none"
              placeholder="Category"
            >
              <option>Type of Store</option>
              <option>Store 1</option>
              <option>Store 2</option>
              <option>Store 3</option>
            </select>
          </label>
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="text-green-400 pointer-events-none w-4 h-4 absolute inset-y-1/3 right-3" />
            <select
              className="px-2.5 py-2 w-full rounded appearance-none focus:outline-none"
              placeholder="Category"
            >
              <option>Type of Vendor</option>
              <option>Vendor 1</option>
              <option>Vendor 2</option>
              <option>Vendor 3</option>
            </select>
          </label>
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="text-green-400 pointer-events-none w-4 h-4 absolute inset-y-1/3 right-3" />
            <select
              className="px-2.5 py-2 w-full rounded appearance-none focus:outline-none"
              placeholder="Category"
            >
              <option>Gender Type</option>
              <option>Gender 1</option>
              <option>Gender 2</option>
              <option>Gender 3</option>
            </select>
          </label>
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="text-green-400 pointer-events-none w-4 h-4 absolute inset-y-1/3 right-3" />
            <select
              className="px-2.5 py-2 w-full rounded appearance-none focus:outline-none"
              placeholder="Category"
            >
              <option>Store Location</option>
              <option>Location 1</option>
              <option>Location 2</option>
              <option>Location 3</option>
            </select>
          </label>
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="text-green-400 pointer-events-none w-4 h-4 absolute inset-y-1/3 right-3" />
            <select
              className="px-2.5 py-2 w-full rounded appearance-none focus:outline-none"
              placeholder="Category"
            >
              <option>Filter by City</option>
              <option>City 1</option>
              <option>City 2</option>
              <option>City 3</option>
            </select>
          </label>
          <button className="px-2.5 py-1.5 border border-white text-white rounded">
            Clear Filters
          </button>
        </div>

        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i: number) => (
            <Card key={i} imgUrl="/shop.jpeg" />
          ))}
        </div>

        <div className="flex w-full justify-center">
          <ul className="inline-flex space-x-4 text-white items-center">
            <li className="flex w-10 h-10 p-3 rounded-full bg-green-400 cursor-pointer">
              <FaAngleDoubleLeft className="w-4 h-4" />
            </li>
            <li className="flex w-10 h-10 p-3 rounded-full bg-green-400 cursor-pointer">
              <FaAngleLeft className="w-4 h-4" />
            </li>
            <li className="flex w-10 h-10 p-3 justify-center items-center rounded-full bg-green-400 cursor-pointer">
              1
            </li>
            <li className="flex p-3 rounded-full bg-green-400 cursor-pointer">
              <FaAngleRight className="w-4 h-4" />
            </li>
            <li className="flex w-10 h-10 p-3 rounded-full bg-green-400 cursor-pointer">
              <FaAngleDoubleRight className="w-4 h-4" />
            </li>
          </ul>
        </div>

        <Divider />

        <div className="flex w-full justify-center">
          <p className="text-2xl font-bold uppercase">Collaboration</p>
        </div>

        <div className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i: number) => (
            <ImageCard key={i} imgUrl="/shop-2.jpeg" />
          ))}
        </div>
      </div>
    </>
  );
};
