import React from "react";

export const BoldText: React.FC = ({ children }) => {
  //@ts-ignore
  return <div className="font-bold">{children}</div>;
};
