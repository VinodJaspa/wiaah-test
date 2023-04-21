import React from "react";
import { HtmlDivProps } from "types";
import { MapChildren, runIfFn } from "utils";

export interface StackProps extends HtmlDivProps {
  col?: boolean;
  divider?: React.ReactNode;
}

export const Stack: React.FC<StackProps> = ({
  children,
  divider,
  col,
  className,
  ...props
}) => {
  console.log({ children });
  return (
    <div
      {...props}
      className={`${col ? "flex-col" : "flex-row"} ${
        className || ""
      } w-full flex`}
    >
      {React.Children.map(children, (child, i) => (
        <>
          {child}
          {divider && Array.isArray(children)
            ? i === children.length - 1
              ? null
              : runIfFn(divider)
            : null}
        </>
      ))}
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
      className={`${className || ""} flex flex-col items-center gap-2`}
    >
      {children}
    </div>
  );
};
