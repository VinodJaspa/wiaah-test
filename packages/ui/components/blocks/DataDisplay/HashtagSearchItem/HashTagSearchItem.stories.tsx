import { storybookDataDisplayBlocksTitle, HashTagSearchItem } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookDataDisplayBlocksTitle + "HashTagSearchItem",
  component: HashTagSearchItem,
} as ComponentMeta<typeof HashTagSearchItem>;

export const Default = () => (
  <HashTagSearchItem hashtagName="test" hashtagViews={153} />
);
