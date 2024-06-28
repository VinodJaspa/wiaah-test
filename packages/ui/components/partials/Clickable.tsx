import React from "react";

export interface ClickableProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const Clickable: React.FC<ClickableProps> = ({ children, ...props }) => {
  return (
    <div style={{ ...props.style, cursor: "pointer" }} {...props}>
    {/* @ts-ignore */}
      {children}
    </div>
  );
};
