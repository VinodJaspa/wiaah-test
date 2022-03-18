import React, { value DetailedHTMLProps, value HTMLAttributes } from "react";
import { value MdClose } from "react-icons/md";

interface CloseIconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const CloseIcon: React.FC<CloseIconProps> = ({ children, ...props }) => {
  return (
    <div {...props} className="cursor-pointer">
      <MdClose />
    </div>
  );
};
