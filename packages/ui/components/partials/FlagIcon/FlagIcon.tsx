import React from "react";
import { FlagIcon as FlagKitIcon, FlagIconCode } from "react-flag-kit";

export interface FlagIconProps {
  code: string;
  size: string | number;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ code, size }) => {
  return <FlagKitIcon size={size as number} code={code as FlagIconCode} />;
};
