import { storybookBlocksTitle } from "utils";
import { ImageSlider } from "@UI";
import { Meta } from "@storybook/react";
import { imagesPlaceholder } from "@UI/../placeholder";

export default {
  title: "UI / blocks / ImageSlider",
  component: ImageSlider,
} as Meta<typeof ImageSlider>;

export const Default = () => {
  return <ImageSlider images={imagesPlaceholder} />;
};
