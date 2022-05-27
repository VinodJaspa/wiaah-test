import { storybookDataDisplayBlocksTitle, DiscoverItem } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookDataDisplayBlocksTitle + "DiscoverItem",
  component: DiscoverItem,
} as ComponentMeta<typeof DiscoverItem>;

export const Default = () => <DiscoverItem thumbnail="/shop.jpeg" />;
