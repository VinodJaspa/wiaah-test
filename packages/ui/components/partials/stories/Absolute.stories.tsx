import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Absolute } from "../";
export default {
  title: "UI/partials/Absolute",
  component: Absolute,
} as Meta<typeof Absolute>;

const Template: StoryFn<typeof Absolute> = (args) => (
  <Absolute {...args}>
    <div className="h-8 w-8 bg-blue-400"></div>
  </Absolute>
);

export const Default = {
  render: Template,
  args: {},

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="relative h-full w-full">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};

export const verticallyCentered = {
  render: Template,

  args: {
    verticalCenter: true,
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="relative h-full w-full">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};

export const HorizontallyCentered = {
  render: Template,

  args: {
    horizontalCenter: true,
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="relative h-full w-full">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};

export const ExplictPosition = {
  render: Template,

  args: {
    position: {
      top: {
        value: 15,
      },
      left: {
        value: 5,
      },
    },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="relative h-full w-full">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};
