import React from "react";
import { HtmlDivProps } from "types";
import { FcCancel } from "react-icons/fc";
export const CancelIcon: React.FC<HtmlDivProps> = (props) => {
  return (
    <div {...props}>
      <FcCancel />
    </div>
  );
};
