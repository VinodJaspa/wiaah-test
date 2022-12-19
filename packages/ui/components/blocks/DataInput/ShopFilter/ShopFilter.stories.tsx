import { ComponentMeta } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";
import { ShopFilter } from "@UI";

export default {
  title: storybookDataInputBlocksTitle + "ShopFilter",
  component: ShopFilter,
} as ComponentMeta<typeof ShopFilter>;

export const Default = () => {
  return <ShopFilter />;
};
export const desktopView = () => {
  return <ShopFilter onlyMobile={false} />;
};
