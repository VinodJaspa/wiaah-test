import React from "react";
import { MdClose } from "react-icons/md";
import { HtmlDivProps } from "types";

export interface FailedIconProps extends HtmlDivProps {}

export const FailedIcon: React.FC<FailedIconProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${
        className || ""
      } w-[1em] h-[1em] p-[0.1em] rounded-full bg-red-500 flex text-white items-center justify-center`}
    >
      <MdClose />
    </div>
  );
};
