import React from "react";

export type InfoTextCases = {
  success?: string;
  fail?: string;
  info?: string;
  warning?: string;
};
export interface InfoTextProps {
  value?: string | number | boolean;
  cases?: InfoTextCases;
  variant?: keyof InfoTextCases;
}

export const InfoText: React.FC<InfoTextProps> = ({
  children,
  cases,
  value: _value,
  variant,
}) => {
  const value = children ?? _value;
  const styleCases: Record<keyof InfoTextCases, string> = {
    success: `text-primary`,
    fail: `text-red-500`,
    info: `text-blue-500`,
    warning: `text-yellow-500`,
  };
  const styleSwitcher = () => {
    if (variant) return styleCases[variant];
    if (!cases) return styleCases.success;
    if (value === cases.success) return styleCases.success;
    if (value === cases.info) return styleCases.info;
    if (value === cases.fail) return styleCases.fail;
    if (value === cases.warning) return styleCases.warning;
    return styleCases.success;
  };
  return (
    <div className={`${styleSwitcher()} flex relative isolate`}>
      <span className={`${styleSwitcher()} w-1 absolute lef-0 top-0 h-full`} />

      {/* @ts-ignore */}
      <span className="pl-4">{children}</span>
    </div>
  );
};
