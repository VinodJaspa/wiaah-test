import React from "react";
import { HtmlDivProps } from "types";
import { BiHeart } from "react-icons/bi";

export const HeartIcon: React.FC<HtmlDivProps> = (props) => {
  return (
    <div {...props}>
      <BiHeart />
    </div>
  );
};
