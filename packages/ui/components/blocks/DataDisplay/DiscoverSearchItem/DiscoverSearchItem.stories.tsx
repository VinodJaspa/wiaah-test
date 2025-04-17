import { storybookDataDisplayBlocksTitle, DiscoverItem } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Data Display /DiscoverItem",
  component: DiscoverItem,
} as Meta<typeof DiscoverItem>;

export const Default = () => <DiscoverItem thumbnail="/shop.jpeg" />;
