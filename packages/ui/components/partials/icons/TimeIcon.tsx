import React from "react";
import { HtmlDivProps } from "types";
import { BsClock } from "react-icons/bs";

export const TimeIcon: React.FC<HtmlDivProps> = ({ className, ...props }) => {
  return (
    <div {...props} className={`${className || ""}`}>
      <BsClock />
    </div>
  );
};
