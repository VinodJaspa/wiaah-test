import React from "react";
import { HiShare } from "react-icons/hi";
import { BiChevronLeft } from "react-icons/bi";
export const MinimalHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-2 shadow-md p-2 text-4xl w-full justify-between">
      <BiChevronLeft className="text-[1.3em]" />
      <HiShare />
    </div>
  );
};
