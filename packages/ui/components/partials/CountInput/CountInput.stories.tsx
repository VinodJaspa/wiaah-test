import { Meta, StoryFn } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";
import { CountInput } from "./CountInput";

export default {
  title: "UI / blocks / Data Input /CountInput",
  component: CountInput,
} as Meta<typeof CountInput>;

export const Default = {
  args: {},
};

export const Bounded = {
  args: {
    min: 0,
    max: 5,
  },
};
