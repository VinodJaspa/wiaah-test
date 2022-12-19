import { storybookBlocksTitle } from "utils";
import { ImageSlider } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "ImageSlider",
  component: ImageSlider,
} as ComponentMeta<typeof ImageSlider>;

export const Default = () => {
  return <ImageSlider />;
};
