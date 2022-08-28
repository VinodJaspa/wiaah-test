import React from "react";
import { HtmlDivProps } from "types";
import { MapChildren, runIfFn } from "utils";

export interface StackProps {
  col?: boolean;
  divider?: React.ReactNode;
}

export const Stack: React.FC<StackProps> = ({ children, divider, col }) => {
  return (
    <div className={`${col ? "flex-col" : "flex-row"} w-full flex gap-2`}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <>
              {child}
              {divider
                ? i === children.length - 1
                  ? null
                  : runIfFn(divider)
                : null}
            </>
          ))
        : children}
    </div>
  );
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
