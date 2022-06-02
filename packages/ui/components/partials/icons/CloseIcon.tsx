import React from "react";
import { MdClose } from "react-icons/md";
import { HtmlDivProps } from "types";

export interface CloseIconProps extends HtmlDivProps {}

export const CloseIcon: React.FC<CloseIconProps> = ({
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""}`}>
      <MdClose />
    </div>
  );
};
