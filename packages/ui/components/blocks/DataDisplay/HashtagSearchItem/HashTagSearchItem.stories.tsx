import { storybookDataDisplayBlocksTitle, HashTagSearchItem } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Data Display /HashTagSearchItem",
  component: HashTagSearchItem,
} as Meta<typeof HashTagSearchItem>;

export const Default = () => (
  <HashTagSearchItem hashtagName="test" hashtagViews={153} />
);
