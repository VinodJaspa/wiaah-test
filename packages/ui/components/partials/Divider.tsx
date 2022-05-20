import React from "react";
import { HtmlDivProps } from "types";
export interface DividerProps extends HtmlDivProps {}
export const Divider: React.FC<DividerProps> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={`${className || "border-gray-300"} border-b-2 `}
    ></div>
  );
};
