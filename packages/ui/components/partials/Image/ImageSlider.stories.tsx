import { storybookPartailsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { ImageSlider } from "./ImageSlider";

export default {
  title: "UI / partials / ImageSlider",
  component: ImageSlider,
} as Meta<typeof ImageSlider>;

const template: StoryFn<typeof ImageSlider> = (args) => {
  return <ImageSlider {...args} />;
};

export const Default = {
  render: template,

  args: {
    images: ["/shop.jpeg", "/shop-2.jpeg", "/shop-3.jpeg"],
  },
};
