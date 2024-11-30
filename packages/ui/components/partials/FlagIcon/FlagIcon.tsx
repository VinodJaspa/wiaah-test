import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

export interface FlagIconProps {
  code: string;
  size?: string | number;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ code, size = 24 }) => {
  const Flag = Flags[code as keyof typeof Flags];

  // Convert `size` to a number if it's a string
  const numericSize = typeof size === "string" ? parseFloat(size) : size;

  if (!Flag) {
    return (
      <div
        className="flex items-center justify-center bg-gray-200 text-gray-500"
        style={{
          width: numericSize,
          height: numericSize,
          fontSize: numericSize * 0.5,
        }}
      >
        ?
      </div>
    );
  }

  return <Flag style={{ width: numericSize, height: numericSize }} />;
};
