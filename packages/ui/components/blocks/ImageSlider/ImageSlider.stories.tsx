import { storybookBlocksTitle } from "utils";
import { ImageSlider } from "@UI";
import { ComponentMeta } from "@storybook/react";
import { imagesPlaceholder } from "@UI/../placeholder";

export default {
  title: storybookBlocksTitle + "ImageSlider",
  component: ImageSlider,
} as ComponentMeta<typeof ImageSlider>;

export const Default = () => {
  return <ImageSlider images={imagesPlaceholder} />;
};
