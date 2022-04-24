import React from "react";
import { SellerLayout } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";

export default {
  title: "UI/blocks/layouts/SellerLayout",
  component: SellerLayout,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SellerLayout>;

const Templete: ComponentStory<typeof SellerLayout> = (args) => (
  <SellerLayout {...args} />
);

export const Default = Templete.bind({});
