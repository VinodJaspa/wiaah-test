import { StoryFn, Meta } from "@storybook/react";
import { DividerWidthText } from "../index";

export default {
  title: "UI/partials/DividerWithText",
  component: DividerWidthText,
} as Meta<typeof DividerWidthText>;

export const Default = {
  args: {},
};

export const WithText = {
  args: {
    text: "new to Wiaah ?",
  },
};

export const ColoredDivider = {
  args: {
    hexDividerColor: "#0f2",
  },
};

export const ColoredText = {
  args: {
    text: "new to Wiaah ?",
    hexTextColor: "#0f2",
  },
};
