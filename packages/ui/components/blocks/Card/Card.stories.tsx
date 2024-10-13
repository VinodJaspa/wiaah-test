import { storybookBlocksTitle, RecommendedShopCard } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "Card",
  component: RecommendedShopCard,
} as ComponentMeta<typeof RecommendedShopCard>;

export const Default = () => {
  return (
    <RecommendedShopCard id="15" imgUrl="/shop.jpeg" name="card" label="card" />
  );
};
