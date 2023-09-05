import { ComponentMeta } from "@storybook/react";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { storybookProductModalsTitle } from "utils";

export default {
  title: storybookProductModalsTitle + "Order Details",
  component: OrderDetailsModal,
} as ComponentMeta<typeof OrderDetailsModal>;

export const Default = () => {
  return <OrderDetailsModal />;
};
