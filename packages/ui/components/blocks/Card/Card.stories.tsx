import { storybookBlocksTitle, RecommendedShopCard } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Card",
  component: RecommendedShopCard,
} as Meta<typeof RecommendedShopCard>;

export const Default = () => {
  return (
    <RecommendedShopCard id="15" imgUrl="/shop.jpeg" name="card" label="card" />
  );
};
