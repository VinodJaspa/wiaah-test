import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Text } from "../";
export default {
  title: "UI/partials/Text",
  component: Text,
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (args) => (
  <Text {...args}>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium nisi
    eum mollitia explicabo neque similique, quod repellendus facilis hic
    voluptatibus beatae recusandae saepe distinctio eveniet. Ea illo quis ut
    laboriosam alias incidunt, velit corporis sed rem nemo exercitationem fugiat
    error!
  </Text>
);

export const Default = {
  render: Template,
  args: {},

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-1/2">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};

export const MaxLines = {
  render: Template,

  args: {
    maxLines: 3,
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-1/2">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};

export const SmallTextSize = {
  render: Template,

  args: {
    size: "sm",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-1/2">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};

export const MediumTextSize = {
  render: Template,

  args: {
    size: "md",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-1/2">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};

export const LargeTextSize = {
  render: Template,

  args: {
    size: "lg",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-1/2">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};

export const ExtraLargeTextSize = {
  render: Template,

  args: {
    size: "xl",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-1/2">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};

export const CustomTextSize = {
  render: Template,

  args: {
    customSize: {
      value: 5,
    },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-1/2">
          <Story args={args} />
        </div>
      </section>
    ),
  ],
};
