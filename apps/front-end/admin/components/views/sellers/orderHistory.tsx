import { OrdersSection } from "@UI";
import React from "react";

export const AccountOrderHistory: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  return <OrdersSection shopping={false} />;
};
