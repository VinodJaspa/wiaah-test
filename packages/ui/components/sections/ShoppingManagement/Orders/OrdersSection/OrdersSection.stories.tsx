import { storybookSectionsTitle, OrdersSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / OrdersSection",
  component: OrdersSection,
} as Meta<typeof OrdersSection>;

export const Default = () => <OrdersSection shopping={true} />;
