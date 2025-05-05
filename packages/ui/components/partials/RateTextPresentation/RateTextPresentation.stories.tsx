import { Meta, StoryFn } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { RateTextPresentation } from "./RateTextPresentation";

export default {
  title: "UI / partials / RateTextPresentation",
  component: RateTextPresentation,
} as Meta<typeof RateTextPresentation>;

export const Default = {
  args: {
    rate: 4.5,
  },
};
