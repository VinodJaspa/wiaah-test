import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SellerPostInput } from "./index";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Data Input/SellerPostInput",
  component: SellerPostInput,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SellerPostInput>;

const Template: ComponentStory<typeof SellerPostInput> = (args) => (
  <SellerPostInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
