import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShippingMotheds } from "../";
import { shippingMotheds } from "../../../placeholder";
export default {
  title: "UI/blocks/ShippingMotheds",
  component: ShippingMotheds,
} as ComponentMeta<typeof ShippingMotheds>;

const Template: ComponentStory<typeof ShippingMotheds> = (args) => (
  <ShippingMotheds {...args} />
);

export const Default = Template.bind({});
Default.args = {
  motheds: shippingMotheds,
};

Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-slate-200">
      <Story args={args} />
    </section>
  ),
];
