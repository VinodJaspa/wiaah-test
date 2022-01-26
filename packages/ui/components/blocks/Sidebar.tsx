import React, { useState, useContext } from "react";
import {
  FaTimes,
  FaUserAlt,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { SidebarContext } from "../helpers/SidebarContext";

export const Sidebar: React.FC = () => {
  const sidebar = useContext(SidebarContext);
  let [step, setStep] = useState<number>(1);

  const nextStep = () => {
    if (step === 3) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  const resetSteps = () => {
    setStep(1);
  };

  return (
    <>
      <aside
        className={`${
          sidebar?.visible ? "flex" : "hidden"
        } flex flex-col w-72 h-full top-0 left-0 z-30 absolute bg-white text-gray-700 overscroll-contain`}
      >
        <div className="flex w-full p-4 justify-between items-center bg-gray-800 text-white">
          <span className="inline-flex items-center">
            <FaUserAlt className="w-4 h-4 mr-2" /> Hello, Sign in
          </span>
          <div className="flex">
            <button
              className="px-2 py-1.5"
              onClick={() => sidebar?.toggleVisibility()}
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>
        {step === 1 && (
          <ul className="block p-4 space-y-6">
            <li
              className="flex group w-full p-4 rounded-full justify-between items-center cursor-pointer hover:bg-green-100"
              onClick={() => nextStep()}
            >
              <p className="group-hover:text-green-400">Clothing</p>{" "}
              <FaChevronRight className="w-4 h-4" />
            </li>
            <li
              className="flex group w-full p-4 rounded-full justify-between items-center cursor-pointer hover:bg-green-100"
              onClick={() => nextStep()}
            >
              <p className="group-hover:text-green-400">Home &amp; Living</p>{" "}
              <FaChevronRight className="w-4 h-4" />
            </li>
          </ul>
        )}
        {step === 2 && (
          <ul className="block p-4 space-y-6">
            <li
              className="flex group w-full p-4 rounded-full justify-between items-center cursor-pointer hover:bg-green-100"
              onClick={() => resetSteps()}
            >
              <FaChevronLeft className="w-4 h-4" />
              <p className="group-hover:text-green-400 uppercase">
                Main Menu
              </p>{" "}
            </li>
            <li
              className="flex group w-full p-4 rounded-full justify-between items-center cursor-pointer hover:bg-green-100"
              onClick={() => nextStep()}
            >
              <p className="group-hover:text-green-400">Women&apos;s</p>{" "}
              <FaChevronRight className="w-4 h-4" />
            </li>
            <li
              className="flex group w-full p-4 rounded-full justify-between items-center cursor-pointer hover:bg-green-100"
              onClick={() => nextStep()}
            >
              <p className="group-hover:text-green-400">Men&apos;s</p>{" "}
              <FaChevronRight className="w-4 h-4" />
            </li>
          </ul>
        )}
        {step === 3 && (
          <ul className="block p-4 space-y-6">
            <li
              className="flex group w-full p-4 rounded-full justify-between items-center cursor-pointer hover:bg-green-100"
              onClick={() => resetSteps()}
            >
              <FaChevronLeft className="w-4 h-4" />
              <p className="group-hover:text-green-400 uppercase">
                Main Menu
              </p>{" "}
            </li>
            <li
              className="flex group w-full p-4 rounded-full justify-between items-center cursor-pointer hover:bg-green-100"
              onClick={() => nextStep()}
            >
              <p className="group-hover:text-green-400">Dresses</p>{" "}
              <FaChevronRight className="w-4 h-4" />
            </li>
            <li
              className="flex group w-full p-4 rounded-full justify-between items-center cursor-pointer hover:bg-green-100"
              onClick={() => nextStep()}
            >
              <p className="group-hover:text-green-400">Skirts</p>{" "}
              <FaChevronRight className="w-4 h-4" />
            </li>
          </ul>
        )}
      </aside>
    </>
  );
};
