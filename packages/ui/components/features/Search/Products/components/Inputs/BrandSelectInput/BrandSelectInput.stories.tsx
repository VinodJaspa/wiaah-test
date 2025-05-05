import { BrandSelectInput } from "./BrandSelectInput";
import { Meta, StoryFn } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: "UI / Features /Search /Inputs /BrandSelectInput",
  component: BrandSelectInput,
} as Meta<typeof BrandSelectInput>;

export const Default = {
  args: {
    options: ["Nike"],
  },
};
