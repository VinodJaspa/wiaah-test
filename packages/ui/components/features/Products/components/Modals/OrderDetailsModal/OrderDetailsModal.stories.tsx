import { Meta } from "@storybook/react";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { storybookProductModalsTitle } from "utils";

export default {
  title: "UI / Features /product /Modals /Order Details",
  component: OrderDetailsModal,
} as Meta<typeof OrderDetailsModal>;

export const Default = () => {
  return <OrderDetailsModal />;
};
