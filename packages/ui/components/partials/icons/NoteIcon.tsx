import React from "react";
import { HtmlDivProps } from "types";
import { BiNote } from "react-icons/bi";

export const NoteIcon: React.FC<HtmlDivProps> = ({ className, ...props }) => {
  return (
    <div {...props} className={`${className || ""}`}>
      <BiNote />
    </div>
  );
};
