import { Meta } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";
import { ShopFilter } from "@UI";

export default {
  title: "UI / blocks / Data Input /ShopFilter",
  component: ShopFilter,
} as Meta<typeof ShopFilter>;

export const Default = () => {
  return <ShopFilter />;
};
export const desktopView = () => {
  return <ShopFilter onlyMobile={false} />;
};
