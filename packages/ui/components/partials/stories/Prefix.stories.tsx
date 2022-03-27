import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Prefix } from "../";
export default {
  title: "UI/partials/Prefix",
  component: Prefix,
} as ComponentMeta<typeof Prefix>;

const Template: ComponentStory<typeof Prefix> = (args) => <Prefix {...args} />;

export const Default = Template.bind({});
Default.args = {
  prefix: <div className="h-4 w-4 bg-cyan-300"></div>,
  children: "<--- Prefix",
};
Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args} />
    </section>
  ),
];
