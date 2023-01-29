import React from "react";
import { OrderDetailsSection } from "../OrderDetails";
import { OrdersList } from "../OrdersList";

export const OrderContext = React.createContext<{
  orderId: string | undefined;
  shopping: boolean;
  viewOrder: (orderId: string) => unknown;
  cancelViewOrder: () => unknown;
}>({
  orderId: undefined,
  viewOrder: () => {},
  cancelViewOrder: () => {},
  shopping: false,
});

export const OrdersSection: React.FC<{ shopping: boolean }> = ({
  shopping,
}) => {
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
        shopping,
      }}
    >
      {orderId ? <OrderDetailsSection /> : <OrdersList />}
    </OrderContext.Provider>
  );
};
