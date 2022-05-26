import { storybookSectionsTitle, OrdersSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "OrdersSection",
  component: OrdersSection,
} as ComponentMeta<typeof OrdersSection>;

export const Default = () => <OrdersSection />;
