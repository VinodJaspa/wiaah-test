import React from "react";
import { storybookDataInputBlocksTitle } from "ui/utils";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SellerPostInput } from "./index";
export default {
  title: storybookDataInputBlocksTitle + "SellerPostInput",
  component: SellerPostInput,
} as ComponentMeta<typeof SellerPostInput>;

const Template: ComponentStory<typeof SellerPostInput> = (args) => (
  <SellerPostInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
