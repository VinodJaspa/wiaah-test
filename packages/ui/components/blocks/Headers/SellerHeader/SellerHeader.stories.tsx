import React from "react";
import { SellerHeader } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";

export default {
  title: "UI/blocks/Headers/SellerHeader",
  component: SellerHeader,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SellerHeader>;

const Templete: ComponentStory<typeof SellerHeader> = (args) => (
  <SellerHeader {...args} />
);

export const Default = Templete.bind({});
