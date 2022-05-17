import React from "react";
import { HtmlInputProps } from "types";
export interface InputProps extends HtmlInputProps {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`${className || ""} border-gray-300 border-[1px] p-2 rounded`}
    />
  );
};
