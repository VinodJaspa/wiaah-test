import { storybookSectionsTitle, OrdersSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "OrdersSection",
  component: OrdersSection,
} as ComponentMeta<typeof OrdersSection>;

export const Default = () => <OrdersSection shopping={true} />;
