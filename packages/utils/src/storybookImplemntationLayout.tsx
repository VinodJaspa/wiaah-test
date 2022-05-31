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
      className={`${
        className || ""
      } w-full flex flex-col justify-between items-start`}
    >
      {children}
      <div className="">
        <h1 className="font-bold text-xl">implementation</h1>
        <pre>{implmentation}</pre>
      </div>
    </div>
  );
}
