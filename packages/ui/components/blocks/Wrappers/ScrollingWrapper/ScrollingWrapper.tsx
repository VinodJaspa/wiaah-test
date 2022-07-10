import React from "react";

export const ScrollingWrapper: React.FC = ({ children }) => {
  return <div className="w-full h-full overflow-y-scroll">{children}</div>;
};
