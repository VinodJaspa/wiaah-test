import { Meta, StoryFn } from "@storybook/react";
import { HighlightText } from "./HightlightText";
import { storybookPartailsTitle } from "utils";

export default {
  title: "UI / partials / HighlightText",
  component: HighlightText,
} as Meta<typeof HighlightText>;

export const Default = {
  args: {
    text: "this is some random text",
    toHighlight: "and",
  },
};
