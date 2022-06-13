import React from "react";
import { HtmlDivProps } from "types";
import { BiUser } from "react-icons/bi";

export interface PersonIconProps extends HtmlDivProps {}

export const PersonIcon: React.FC<PersonIconProps> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className || ""}`}>
      <BiUser />
    </div>
  );
};
