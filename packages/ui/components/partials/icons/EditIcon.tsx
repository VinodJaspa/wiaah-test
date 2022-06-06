import React from "react";
import { BiEdit } from "react-icons/bi";
import { HtmlDivProps } from "types";

export interface EditIconProps extends HtmlDivProps {}

export const EditIcon: React.FC<EditIconProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <BiEdit />
    </div>
  );
};
