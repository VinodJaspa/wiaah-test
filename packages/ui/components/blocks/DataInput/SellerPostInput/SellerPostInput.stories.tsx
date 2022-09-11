import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useUserData } from "ui";
import { SellerPostInput } from "./index";
import { storybookDataInputBlocksTitle } from "utils";
export default {
  title: storybookDataInputBlocksTitle + "SellerPostInput",
  component: SellerPostInput,
} as ComponentMeta<typeof SellerPostInput>;

const Template: ComponentStory<typeof SellerPostInput> = (args) => {
  return <SellerPostInput {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
