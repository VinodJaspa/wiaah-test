import { OrderStatusEnum } from "@features/API";
import React from "react";
import { HtmlDivProps, OrdersStatus } from "types";

export interface OrderStatusDisplay extends HtmlDivProps {
  status: OrderStatusEnum;
}

export const OrderStatusDisplay: React.FC<OrderStatusDisplay> = ({
  status,
  className,
  ...props
}) => {
  const getStyles = (): string => {
    switch (status) {
      case OrderStatusEnum.Compeleted:
        return "bg-primary-50 text-primary border-primary";
      case OrderStatusEnum.RejectedByBuyer:
      case OrderStatusEnum.RejectedBySeller:
        return "bg-red-50 text-red-500 border-red-500";
      case OrderStatusEnum.Pending:
        return "bg-blue-50 text-blue-500 border-blue-500";
      case OrderStatusEnum.Shipping:
        return "bg-yellow-50 text-yellow-500 border-yellow-500";
      default:
        return "bg-primary-50 text-primary border-primary";
    }
  };
  return (
    <div
      {...props}
      className={`${getStyles()} ${className || ""} p-2 capitalize`}
    >
      {status}
    </div>
  );
};
