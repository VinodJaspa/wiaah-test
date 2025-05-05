import { storybookSectionsTitle, OrdersList } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / OrderList",
  component: OrdersList,
} as Meta<typeof OrdersList>;

export const Default = () => <OrdersList />;
