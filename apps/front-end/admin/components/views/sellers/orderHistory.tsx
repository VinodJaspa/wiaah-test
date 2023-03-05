import { OrdersSection } from "@UI";
import React from "react";

export const orderHistory: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  return <OrdersSection shopping={false} />;
};
