import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Padding } from "../";
export default {
  title: "UI/partials/Padding",
  component: Padding,
} as Meta<typeof Padding>;

const Template: StoryFn<typeof Padding> = (args) => (
  <div className="bg-blue-400 ">
    <Padding {...args}>
      <div className="h-8 w-8 bg-green-500"></div>
    </Padding>
  </div>
);

export const Default = {
  render: Template,
  args: {},

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const XPadding = {
  render: Template,

  args: {
    X: {
      value: 1,
      unit: "rem",
    },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const YPadding = {
  render: Template,

  args: {
    Y: {
      value: 1,
      unit: "rem",
    },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};
