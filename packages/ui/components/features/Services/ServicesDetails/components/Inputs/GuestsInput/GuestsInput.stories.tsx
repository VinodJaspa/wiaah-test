import { storybookOtherServicesInputTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { GuestsInput } from "./GuestsInput";

export default {
  title: "UI / Features /Services /Inputs /GuestsInput",
  component: GuestsInput,
} as Meta<typeof GuestsInput>;

export const Default = {
  args: {},
};
