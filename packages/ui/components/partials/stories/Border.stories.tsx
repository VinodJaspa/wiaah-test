import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Border } from "../";
export default {
  title: "UI/partials/Border",
  component: Border,
} as ComponentMeta<typeof Border>;

const Template: ComponentStory<typeof Border> = (args) => (
  <Border {...args}>
    <div className="h-16 w-16 bg-green-500"></div>
  </Border>
);

export const Default = Template.bind({});
Default.args = {
  color: {
    inHex: "#900",
  },
  thinkness: {
    value: 2,
  },
};
Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
