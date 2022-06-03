import React from "react";
import { HtmlDivProps } from "types";
import { FiPlusSquare } from "react-icons/fi";

export const AddIcon: React.FC<HtmlDivProps> = (props) => {
  return (
    <div {...props}>
      <FiPlusSquare />
    </div>
  );
};
