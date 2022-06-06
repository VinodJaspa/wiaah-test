import React from "react";
import { HtmlDivProps, OrdersStatus } from "types";

export interface OrderStatusDisplay extends HtmlDivProps {
  status: OrdersStatus;
}

export const OrderStatusDisplay: React.FC<OrderStatusDisplay> = ({
  status,
  className,
  ...props
}) => {
  const getStyles = (): string => {
    switch (status) {
      case "completed":
        return "bg-primary-50 text-primary border-primary";
      case "canceled":
        return "bg-red-50 text-red-500 border-red-500";
      case "continuing":
        return "bg-blue-50 text-blue-500 border-blue-500";
      case "restitue":
        return "bg-yellow-50 text-yellow-500 border-yellow-500";
    }
  };
  return (
    <div {...props} className={`${getStyles()} ${className || ""} p-2`}>
      {status}
    </div>
  );
};
