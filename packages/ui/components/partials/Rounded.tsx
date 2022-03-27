import React from "react";

export interface RoundedProps {
  radius: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

export const Rounded: React.FC<RoundedProps> = ({ children, radius }) => {
  return <div className={`overflow-hidden rounded-${radius}`}>{children}</div>;
};
