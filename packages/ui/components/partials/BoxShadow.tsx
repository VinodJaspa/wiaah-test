import React from "react";

export interface BoxShadowProps {
  color?: string;
}

export const BoxShadow: React.FC<BoxShadowProps> = ({
  children,
  color = "#000",
}) => {
  return (
    <div
      className="h-full w-full"
      style={{
        boxShadow: `0px 3px 15px -10px ${color}`,
        WebkitBoxShadow: `0px 3px 15px -10px ${color}`,
        MozBoxShadow: `0px 3px 15px -10px ${color}`,
      }}
    >
      {children}
    </div>
  );
};
