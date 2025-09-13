import React from "react";

export const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white md:p-10 rounded-2xl shadow-lg">
      {children}
    </div>
  );
};
