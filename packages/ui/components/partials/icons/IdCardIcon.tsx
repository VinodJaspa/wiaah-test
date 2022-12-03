import React from "react";
import { HtmlDivProps } from "types";
import { FaIdCard } from "react-icons/fa";
import { IoIdCardOutline } from "react-icons/io5";
import { BiIdCard } from "react-icons/bi";

export interface IdCardIcon extends HtmlDivProps {
  outline?: boolean;
}

export const IdCardIcon: React.FC<IdCardIcon> = ({
  className,
  outline,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className || ""}`}>
      {outline ? <BiIdCard /> : <FaIdCard />}
    </div>
  );
};
