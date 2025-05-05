import { StatusSelectInput } from "./StatusSelectInput";
import { Meta, StoryFn } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: "UI / Features /Search /Inputs /StatusSelectInput",
  component: StatusSelectInput,
} as Meta<typeof StatusSelectInput>;

export const Default = {
  args: {
    options: ["Available", "Out of Stock"],
  },
};
