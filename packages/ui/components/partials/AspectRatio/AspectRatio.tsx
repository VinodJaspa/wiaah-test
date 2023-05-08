import React from "react";
import { HtmlDivProps } from "types";

export interface AspectRatioProps extends HtmlDivProps {
  ratio: number;
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  className,
  style,
  children,
  ...rest
}) => {
  return (
    <div
      style={{ paddingTop: `${ratio * 100}%` }}
      className={`${className || ""} isolate relative w-full`}
      {...rest}
    >
      <div className="absolute top-0 left-0 bottom-0 right-0">{children}</div>
    </div>
  );
};
