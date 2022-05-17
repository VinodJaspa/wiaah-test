import React from "react";
import { HtmlSelectProps } from "types";

export interface SelectProps extends HtmlSelectProps {}

export const Select: React.FC<SelectProps> = ({ className, ...props }) => {
  return (
    <select {...props} className={`${className} border-gray-300 p-2 rounded`}>
      {props.children}
    </select>
  );
};
