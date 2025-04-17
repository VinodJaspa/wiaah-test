import { Meta, StoryFn } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { InfoText } from "./InfoText";

export default {
  title: "UI / partials / InfoText",
  component: InfoText,
} as Meta<typeof InfoText>;

export const Default = {
  args: {},
};
