import React from "react";

export const BoldText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="font-bold">{children}</div>;
};
