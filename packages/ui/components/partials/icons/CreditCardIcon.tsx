import React from "react";
import { HtmlDivProps } from "types";
import { BiCreditCard } from "react-icons/bi";

export interface CreditCardIconProps extends HtmlDivProps {}

export const CreditCardIcon: React.FC<CreditCardIconProps> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className || ""} `}>
      <BiCreditCard />
    </div>
  );
};
