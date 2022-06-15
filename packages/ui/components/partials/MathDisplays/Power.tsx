import React from "react";

export interface MathPowerDisplay {
  power: number;
}

export const MathPowerDisplay: React.FC<MathPowerDisplay> = ({
  power,
  children,
}) => {
  return (
    <div className="relative">
      {children}
      <span className="text-[0.5em] absolute top-0 right-0 transform translate-x-full ">
        {power}
      </span>
    </div>
  );
};
