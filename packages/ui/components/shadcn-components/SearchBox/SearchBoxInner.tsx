import { HiOutlineSearch } from "react-icons/hi";
import { cn } from "../lib/utils";
import React from "react";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void; // 🔹 add callback
}

export default function SearchBoxInner({
  className = "",
  placeholder = "Search products",
  onChange,
}: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 w-full h-10",
        className
      )}
    >
      <HiOutlineSearch className="text-gray-400 text-base" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)} // 🔹 forward value
        className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-400 border-none focus:ring-0 focus:outline-none"
      />
    </div>
  );
}
