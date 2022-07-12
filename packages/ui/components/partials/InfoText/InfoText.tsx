import React from "react";

export type InfoTextVariantsType = "info" | "danger" | "success";

export interface InfoTextProps {
  variant?: InfoTextVariantsType;
}

export const InfoText: React.FC<InfoTextProps> = ({
  children,
  variant = "info",
}) => {
  const color =
    variant === "danger"
      ? "red-500"
      : variant === "info"
      ? "blue-400"
      : "primary";
  return (
    <div className={`text-${color} flex relative`}>
      <span className={`bg-${color} w-1 absolute lef-0 top-0 h-full`} />
      <span className="pl-4">{children}</span>
    </div>
  );
};
