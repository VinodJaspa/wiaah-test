import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

export interface FlagIconProps {
  code: string;
  size?: string | number;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ code, size }) => {
  // @ts-ignore
  const Flag = Flags[code];

  return <Flag className="w-6 h-6" code={code} />;
};
