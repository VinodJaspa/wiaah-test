import { storybookSectionsTitle, ReturnedOrders } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "CanceledOrdersSection",
  component: ReturnedOrders,
} as ComponentMeta<typeof ReturnedOrders>;

export const Default = () => <ReturnedOrders />;
