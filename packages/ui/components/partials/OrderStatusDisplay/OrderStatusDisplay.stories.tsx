import { ComponentMeta } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { OrderStatusDisplay } from "@UI";

export default {
  title: storybookPartailsTitle + "OrderStatusDisplay",
  component: OrderStatusDisplay,
} as ComponentMeta<typeof OrderStatusDisplay>;

export const canceled = () => {
  return <OrderStatusDisplay status="canceled" />;
};

export const completed = () => {
  return <OrderStatusDisplay status="completed" />;
};

export const continuing = () => {
  return <OrderStatusDisplay status="continuing" />;
};

export const restitue = () => {
  return <OrderStatusDisplay status="restitue" />;
};
