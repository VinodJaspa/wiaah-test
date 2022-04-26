import React from "react";

export const Verified: React.FC = ({ ...props }) => {
  return (
    <img
      {...props}
      src="/verified.png"
      className="h-4 w-4 "
      alt="shop verified"
    />
  );
};
