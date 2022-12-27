import React from "react";
import { HtmlDivProps } from "types";

export type BadgeCases<T> = {
  success?: T;
  fail?: T;
  info?: T;
  warning?: T;
  off?: T;
};

export interface BadgeProps<T extends string | number> extends HtmlDivProps {
  value?: T;
  cases?: BadgeCases<T>;
  variant?: keyof BadgeCases<T>;
}

export function Badge<T extends string | number>({
  cases,
  value,
  children,
  className,
  variant = "success",
  ...props
}: BadgeProps<T>) {
  const styleCases: Record<keyof BadgeCases<T>, string> = {
    success: `bg-primary-50 border border-primary`,
    fail: `bg-red-50 border border-red-500`,
    info: `bg-blue-50 border border-blue-500`,
    warning: `bg-yellow-50 border border-yellow-500`,
    off: "bg-gray-100 border border-gray-500",
  };
  const styleSwitcher = () => {
    if (cases) {
      if (value === cases.success) return styleCases.success;
      if (value === cases.info) return styleCases.info;
      if (value === cases.fail) return styleCases.fail;
      if (value === cases.warning) return styleCases.warning;
      if (value === cases.off) return styleCases.off;
    }
    if (variant) return styleCases[variant];
  };

  return (
    <div
      {...props}
      className={`${
        className || ""
      } flex justify-center items-center px-4 py-1 rounded ${styleSwitcher()}`}
    >
      {children}
    </div>
  );
}
