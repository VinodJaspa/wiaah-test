import React from "react";
import { BiCalendar } from "react-icons/bi";
import { HtmlDivProps } from "types";

export interface CalenderIconProps extends HtmlDivProps {}

export const CalenderIcon: React.FC<CalenderIconProps> = ({
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""}`}>
      <BiCalendar />
    </div>
  );
};
