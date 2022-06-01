import React from "react";
import { ImCheckmark } from "react-icons/im";
import { HtmlDivProps } from "types";

export interface SuccessIconProps extends HtmlDivProps {}

export const SuccessIcon: React.FC<SuccessIconProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${
        className || ""
      } w-[1em] h-[1em] p-[0.2em] rounded-full bg-primary text-white flex items-center justify-center`}
    >
      <ImCheckmark />
    </div>
  );
};
