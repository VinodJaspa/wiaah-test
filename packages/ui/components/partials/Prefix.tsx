import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";
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
}) => {
  return (
    <div className={`${className || ""} flex items-center gap-2`}>
      {runIfFn<HtmlDivProps>(Prefix, { className: PrefixClassName })}
      {children}
    </div>
  );
};
