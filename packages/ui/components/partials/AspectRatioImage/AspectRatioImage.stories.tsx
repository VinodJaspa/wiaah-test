import { Meta, StoryFn } from "@storybook/react";
import { AspectRatioImage } from "./AspectRatioImage";
import { storybookPartailsTitle } from "utils";

export default {
  title: "UI / partials / AspectRatioImage",
  component: AspectRatioImage,
} as Meta<typeof AspectRatioImage>;

export const Default = {
  args: {
    ratio: 3 / 4,
    src: "/shop-2.jpeg",
    alt: "aspect ratio image",
  },
};
