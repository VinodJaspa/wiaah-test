import React from "react";
import { HtmlDivProps } from "types";
import { BsCash } from "react-icons/bs";

export interface CashPaymentIcon extends HtmlDivProps {}

export const CashPaymentIcon: React.FC<CashPaymentIcon> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className || ""} `}>
      <BsCash />
    </div>
  );
};
