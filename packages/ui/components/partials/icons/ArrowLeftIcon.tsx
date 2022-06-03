import React from "react";
import { HtmlDivProps } from "types";
import { BiChevronLeft } from "react-icons/bi";

export const ArrowLeftIcon: React.FC<HtmlDivProps> = (props) => {
  return (
    <div {...props}>
      <BiChevronLeft />
    </div>
  );
};
