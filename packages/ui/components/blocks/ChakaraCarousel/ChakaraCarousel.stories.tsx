import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Carousel } from "./index";
export default {
  title: "UI/blocks/ChakaraCarousel",
  component: Carousel,
} as Meta<typeof Carousel>;

const Template: StoryFn<typeof Carousel> = (args) => (
  <div className="h-96 w-[20rem]">
    <Carousel {...args}>
      {[...Array(10)].map((_, i) => (
        <div className="h-48  bg-green-400">test {i}</div>
      ))}
    </Carousel>
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

export const WithArrows = {
  render: Template,

  args: {
    arrows: true,
    h: "100%",
  },
};
