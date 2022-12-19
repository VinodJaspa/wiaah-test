import { storybookBlocksTitle, Card } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

export const Default = () => {
  return <Card id="15" imgUrl="/shop.jpeg" name="card" />;
};
