import { storybookSectionsTitle, OrdersList } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "OrderList",
  component: OrdersList,
} as ComponentMeta<typeof OrdersList>;

export const Default = () => <OrdersList />;
