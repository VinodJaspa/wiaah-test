import React from "react";

export const Root: React.FC = ({ children }) => {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen relative overflow-hidden">
        {children}
      </div>
    </>
  );
};
