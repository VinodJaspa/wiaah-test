import React from "react";
import { SubscribeForm } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "UI/blocks/SubscribeForm",
  component: SubscribeForm,
} as ComponentMeta<typeof SubscribeForm>;

const Templete: ComponentStory<typeof SubscribeForm> = (args) => (
  <SubscribeForm {...args} />
);

export const Default = Templete.bind({});
