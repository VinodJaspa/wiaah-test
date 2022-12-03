import React from "react";
import { HtmlDivProps } from "types";
import { BiChevronUp } from "react-icons/bi";
export const ArrowUpIcon: React.FC<HtmlDivProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <BiChevronUp />
    </div>
  );
};
