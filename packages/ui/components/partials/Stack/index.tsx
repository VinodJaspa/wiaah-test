import React from "react";
import { HtmlDivProps } from "types";

export interface StackProps {}

export const Stack: React.FC<StackProps> = ({ children }) => {
  return <div className="flex gap-2">{children}</div>;
};

export interface HStackProps extends HtmlDivProps {}

export const HStack: React.FC<HStackProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""} flex items-center gap-2`}>
      {children}
    </div>
  );
};
export interface VStack extends HtmlDivProps {}

export const VStack: React.FC<HStackProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${className || ""} flex flex-col justify-center gap-2`}
    >
      {children}
    </div>
  );
};
