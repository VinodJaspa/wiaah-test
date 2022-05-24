import React from "react";
import { HtmlInputProps } from "types";
export interface InputProps extends HtmlInputProps {
  flushed?: boolean;
}

export const Input: React.FC<InputProps> = ({
  className,
  flushed,
  ...props
}) => {
  return (
    <input
      {...props}
      className={`${className || ""} ${
        flushed ? "border-b-2" : "border-[1px]"
      } border-gray-200 p-2 rounded`}
    />
  );
};
