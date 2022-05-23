import React from "react";
import { OrderDetailsSection } from "../OrderDetails";
import { OrdersList } from "../OrdersList";

export const OrderContext = React.createContext<{
  orderId: string | undefined;
  viewOrder: (orderId: string) => unknown;
  cancelViewOrder: () => unknown;
}>({
  orderId: undefined,
  viewOrder: () => {},
  cancelViewOrder: () => {},
});

export const OrdersSection: React.FC = () => {
  const [orderId, setOrderId] = React.useState<string>();

  function handleViewOrder(orderId: string) {
    setOrderId(orderId);
  }

  function handleCancelViewOrder() {
    setOrderId(undefined);
  }
  return (
    <OrderContext.Provider
      value={{
        orderId,
        cancelViewOrder: handleCancelViewOrder,
        viewOrder: handleViewOrder,
      }}
    >
      {orderId ? <OrderDetailsSection /> : <OrdersList />}
    </OrderContext.Provider>
  );
};
