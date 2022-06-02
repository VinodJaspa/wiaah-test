import React from "react";
import { HtmlDivProps } from "types";
import { BiChevronDown } from "react-icons/bi";
export const ArrowDownIcon: React.FC<HtmlDivProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <BiChevronDown />
    </div>
  );
};
