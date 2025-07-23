
import { HiOutlineSearch } from "react-icons/hi";
import { cn } from "../lib/utils";
import React from "react";
interface SearchInputProps {
  className?: string;
  placeholder?: string;
}

export default function SearchBoxInner({
  className = "",
  placeholder = "Search products",
}: SearchInputProps) {
  return (
    <div className={cn("flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 w-full h-10", className)}>
      <HiOutlineSearch className="text-gray-400 text-base" />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-400 border-none focus:ring-0 focus:outline-none"
      />
    </div>
  );
}
