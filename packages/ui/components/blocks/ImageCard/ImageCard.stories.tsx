import { storybookBlocksTitle } from "utils";
import { ImageCard } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "ImageCard",
  component: ImageCard,
} as ComponentMeta<typeof ImageCard>;

export const Default = () => {
  return <ImageCard />;
};
