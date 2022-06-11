import React from "react";
import { HtmlDivProps } from "types";
import { CgSpinner } from "react-icons/all";

export const Spinner: React.FC<HtmlDivProps> = ({ className, ...props }) => {
  return (
    <div {...props} className={`${className || ""} animate-spin`}>
      <CgSpinner />
    </div>
  );
};
