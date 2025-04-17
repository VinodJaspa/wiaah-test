import { FilterSelectInput } from "./FilterSelectInput";
import { Meta, StoryFn } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: "UI / Features /Search /Inputs /FilterSelectInput",
  component: FilterSelectInput,
} as Meta<typeof FilterSelectInput>;

export const Default = {
  args: {
    options: ["Available", "Out of Stock"],
  },
};
