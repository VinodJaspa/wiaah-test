import React from "react";
import { HtmlDivProps } from "types";

type BadgeCases = {
  success?: string;
  fail?: string;
  info?: string;
  warning?: string;
};

export interface BadgeProps extends HtmlDivProps {
  value?: string | number | boolean;
  cases?: BadgeCases;
  variant?: keyof BadgeCases;
}

export const Badge: React.FC<BadgeProps> = ({
  cases,
  value,
  children,
  className,
  variant = "success",
  ...props
}) => {
  const styleCases: Record<keyof BadgeCases, string> = {
    success: `bg-primary-50 border border-primary`,
    fail: `bg-red-50 border border-red-500`,
    info: `bg-blue-50 border border-blue-500`,
    warning: `bg-yellow-50 border border-yellow-500`,
  };
  const styleSwitcher = () => {
    if (cases) {
      if (value === cases.success) return styleCases.success;
      if (value === cases.info) return styleCases.info;
      if (value === cases.fail) return styleCases.fail;
      if (value === cases.warning) return styleCases.warning;
    }
    if (variant) return styleCases[variant];
  };

  return (
    <div
      {...props}
      className={`${className || ""} px-4 py-1 rounded ${styleSwitcher()}`}
    >
      {children}
    </div>
  );
};
