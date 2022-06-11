import { storybookBlocksTitle } from "utils";
import { Information } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "Information",
  component: Information,
} as ComponentMeta<typeof Information>;

export const Default = () => {
  return <Information />;
};
