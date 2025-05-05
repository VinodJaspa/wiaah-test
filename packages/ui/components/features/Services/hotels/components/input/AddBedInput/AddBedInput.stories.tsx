import { Meta, StoryFn } from "@storybook/react";
import { AddBedInput } from "./AddBedInput";
import { storybookHotelInputTitle } from "utils";

export default {
  title: "UI / Features /Hotel /Inputs /AddBedInput",
  component: AddBedInput,
} as Meta<typeof AddBedInput>;

export const Default = {
  args: {},
};
