import React from "react";
import { SubscribeForm } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";

export default {
  title: "UI/blocks/SubscribeForm",
  component: SubscribeForm,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SubscribeForm>;

const Templete: ComponentStory<typeof SubscribeForm> = (args) => (
  <SubscribeForm {...args} />
);

export const Default = Templete.bind({});
