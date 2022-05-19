import React from "react";
import { HtmlDivProps, PriceType } from "types";

export interface PriceDisplayProps extends HtmlDivProps {
  priceObject: PriceType;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  priceObject,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""}`}>
      {priceObject.amount} {priceObject.currency}
    </div>
  );
};
