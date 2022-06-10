import { ComponentMeta } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";
import { ShopFilter } from "ui";

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
