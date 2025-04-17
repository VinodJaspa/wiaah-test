import { storybookSectionsTitle, ReturnedOrders } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / CanceledOrdersSection",
  component: ReturnedOrders,
} as Meta<typeof ReturnedOrders>;

export const Default = () => <ReturnedOrders />;
