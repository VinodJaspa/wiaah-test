import React from "react";
import { HtmlDivProps } from "types";
import { BiChevronRight } from "react-icons/bi";
import { IconBaseProps } from "react-icons";

export const ArrowRightIcon: React.FC<IconBaseProps> = (props) => {
  return <BiChevronRight {...props} />;
};
