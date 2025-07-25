import React from "react";
import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-md shadow-sm
                  hover:bg-gray-800 hover:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                  active:scale-95 transition-transform duration-150
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}
