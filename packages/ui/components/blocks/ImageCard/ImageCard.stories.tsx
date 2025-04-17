import { storybookBlocksTitle } from "utils";
import { ImageCard } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / ImageCard",
  component: ImageCard,
} as Meta<typeof ImageCard>;

export const Default = () => {
  return <ImageCard />;
};
