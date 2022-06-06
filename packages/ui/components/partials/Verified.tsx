import React from "react";
import { MdVerified } from "react-icons/md";
import { HtmlDivProps } from "types";
export const Verified: React.FC<HtmlDivProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <MdVerified />
    </div>
  );
};
