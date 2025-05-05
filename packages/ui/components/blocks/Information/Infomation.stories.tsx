import { storybookBlocksTitle } from "utils";
import { Information } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Information",
  component: Information,
} as Meta<typeof Information>;

export const Default = () => {
  return <Information />;
};
