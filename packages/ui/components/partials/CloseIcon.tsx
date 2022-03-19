import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { MdClose } from "react-icons/md";

interface CloseIconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const CloseIcon: React.FC<CloseIconProps> = ({ children, ...props }) => {
  return (
    <div {...props} className="cursor-pointer">
      <MdClose />
    </div>
  );
};
