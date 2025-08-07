import React from "react";

export const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white md:p-16 rounded-2xl shadow-lg md:space-y-16 md:mx-20">
      {children}
    </div>
  );
};
