import React from "react";
import { FlagIcon as FlagKitIcon, FlagIconCode } from "react-flag-kit";

export interface FlagIconProps {
  code: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ code }) => {
  return <FlagKitIcon code={code as FlagIconCode} />;
};
