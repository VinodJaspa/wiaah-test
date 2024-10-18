import { ComponentMeta } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { OrderStatusDisplay } from "@UI";
import { OrderStatusEnum } from "@features/API/gql/generated";

export default {
  title: storybookPartailsTitle + "OrderStatusDisplay",
  component: OrderStatusDisplay,
} as ComponentMeta<typeof OrderStatusDisplay>;

export const canceled = () => {
  return <OrderStatusDisplay status={OrderStatusEnum.RejectedBySeller} />;
};

export const completed = () => {
  return <OrderStatusDisplay status={OrderStatusEnum.Compeleted} />;
};

export const continuing = () => {
  return <OrderStatusDisplay status={OrderStatusEnum.Pending} />;
};

export const restitue = () => {
  return <OrderStatusDisplay status={OrderStatusEnum.Pending} />;
};
