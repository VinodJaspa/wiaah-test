// @ts-nocheck
import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { VerticalCarousel } from "@UI";
export default {
  title: "UI/blocks/Data Display/ActionsDisplay",
  component: VerticalCarousel,
} as Meta<typeof VerticalCarousel>;

const Template: StoryFn<typeof VerticalCarousel> = ({ h, ...args }) => (
  <div className="h-[30rem] w-[20rem]">
    <VerticalCarousel h={"24rem"} {...args}>
      {[...Array(10)].map((_, i) => (
        <div className="h-96  bg-green-400">test {i}</div>
      ))}
    </VerticalCarousel>
  </div>
);

export const Default = {
  render: Template,
  args: {},
};

export const WithGap = {
  render: Template,

  args: {
    gap: 16,
  },
};
