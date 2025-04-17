import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { BoxShadow } from "../";
export default {
  title: "UI/partials/BoxShadow",
  component: BoxShadow,
} as Meta<typeof BoxShadow>;

const Template: StoryFn<typeof BoxShadow> = (args) => (
  <BoxShadow {...args}>
    <div className="h-48 w-48 "></div>
  </BoxShadow>
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
