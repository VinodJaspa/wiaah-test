import React from "react";
import { FaTimes, FaUserAlt, FaChevronRight } from "react-icons/fa";

interface SidebarProps {
  visible?: boolean;
  close: Function;
}

export const Sidebar: React.FC<SidebarProps> = ({ visible, close }) => {
  return (
    <>
      <aside
        className={`${
          visible ? "flex" : "hidden"
        } flex flex-col w-72 h-full top-0 left-0 z-30 absolute bg-white text-gray-700`}
      >
        <div className="flex w-full p-4 justify-between items-center bg-gray-800 text-white">
          <span className="inline-flex items-center">
            <FaUserAlt className="w-4 h-4 mr-2" /> Hello, Sign in
          </span>
          <div className="flex">
            <button className="px-2 py-1.5" onClick={() => close()}>
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>
        <ul className="block p-4 space-y-6">
          <li className="flex group w-full p-4 rounded-full justify-between items-center cursor-pointer hover:bg-green-100">
            <p className="group-hover:text-green-400">Clothing</p>{" "}
            <FaChevronRight className="w-4 h-4" />
          </li>
          <li className="flex group w-full p-4 rounded-full justify-between items-center cursor-pointer hover:bg-green-100">
            <p className="group-hover:text-green-400">Home &amp; Living</p>{" "}
            <FaChevronRight className="w-4 h-4" />
          </li>
        </ul>
      </aside>
    </>
  );
};
