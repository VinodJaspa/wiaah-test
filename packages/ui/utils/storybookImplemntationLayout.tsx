import React from "react";
import { HtmlDivProps } from "types";

export interface storybookImplemntationLayoutProps extends HtmlDivProps {
  implmentation: string;
}

export function StorybookImplemntationLayout<T>({
  className,
  children,
  implmentation,
  ...props
}: storybookImplemntationLayoutProps & T): JSX.Element {
  return (
    <div
      {...props}
      className={`${className || ""} w-full flex justify-between items-center`}
    >
      <div className="max-w-[50%]">
        <h1>implementation</h1>
        <pre>{implmentation}</pre>
      </div>
      {children}
    </div>
  );
}
