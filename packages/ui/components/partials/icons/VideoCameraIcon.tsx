import React from "react";
import { HtmlDivProps } from "types";
import { HiVideoCamera } from "react-icons/hi";

export const VideoCameraIcon: React.FC<HtmlDivProps> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className || ""} `}>
      <HiVideoCamera />
    </div>
  );
};
