import React from "react";
import { HtmlDivProps } from "types";
import { FaSnowflake } from "react-icons/fa";

export interface AirConditionIconProps extends HtmlDivProps {}

export const AirConditionIcon: React.FC<AirConditionIconProps> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className || ""}`}>
      <FaSnowflake />
    </div>
  );
};
