import React from "react";

export interface BoxShadowProps {
  color?: string;
  fitWidth?: boolean;
  fitHeight?: boolean;
}

export const BoxShadow: React.FC<BoxShadowProps> = ({
  children,
  color = "#000",
  fitHeight,
  fitWidth,
}) => {
  return (
    <div
      style={{
        boxShadow: `0px 3px 15px -15px ${color}`,
        WebkitBoxShadow: `0px 3px 15px -15px ${color}`,
        MozBoxShadow: `0px 3px 15px -15px ${color}`,
        width: fitWidth ? "fit-content" : "inherit",
        height: fitHeight ? "fit-content" : "inherit",
      }}
    >
      {children}
    </div>
  );
};
