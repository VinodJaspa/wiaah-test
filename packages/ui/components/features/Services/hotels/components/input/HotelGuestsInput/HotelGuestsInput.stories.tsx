import { Meta, StoryFn } from "@storybook/react";
import { storybookHotelInputTitle } from "utils";
import { HotelGuestsInput } from "./HotelGuestsInput";

export default {
  title: "UI / Features /Hotel /Inputs /HotelGuestsInput",
} as Meta<typeof HotelGuestsInput>;

const template: StoryFn<typeof HotelGuestsInput> = (args) => (
  <HotelGuestsInput {...args} />
);

export const Default = {
  render: template,

  args: {
    name: "adults",
    description: "16+ years old",
  },
};
