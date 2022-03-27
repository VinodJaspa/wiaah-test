import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Padding } from "../";
export default {
  title: "UI/partials/Padding",
  component: Padding,
} as ComponentMeta<typeof Padding>;

const Template: ComponentStory<typeof Padding> = (args) => (
  <div className="bg-blue-400 ">
    <Padding {...args}>
      <div className="h-8 w-8 bg-green-500"></div>
    </Padding>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const XPadding = Template.bind({});
XPadding.args = {
  X: {
    value: 1,
    unit: "rem",
  },
};
XPadding.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const YPadding = Template.bind({});
YPadding.args = {
  Y: {
    value: 1,
    unit: "rem",
  },
};
YPadding.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
