import React from "react";
import { runIfFn } from "utils";
import { HtmlDivProps } from "types";
export interface PrefixProps extends HtmlDivProps {
  Prefix: React.ReactNode;
  PrefixClassName?: string;
}
export const Prefix: React.FC<PrefixProps> = ({
  children,
  Prefix,
  className,
  PrefixClassName,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""} flex items-center gap-2`}>
      <>
        {runIfFn<HtmlDivProps>(Prefix, { className: PrefixClassName })}
        <>{children}</>
      </>
    </div>
  );
};
