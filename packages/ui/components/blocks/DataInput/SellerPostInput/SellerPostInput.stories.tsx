import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { useUserData } from "@UI";
import { SellerPostInput } from "./index";
import { storybookDataInputBlocksTitle } from "utils";
export default {
  title: "UI / blocks / Data Input /SellerPostInput",
  component: SellerPostInput,
} as Meta<typeof SellerPostInput>;

const Template: StoryFn<typeof SellerPostInput> = (args) => {
  return <SellerPostInput {...args} />;
};

export const Default = {
  render: Template,
  args: {},
};
