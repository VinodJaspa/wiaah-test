import { ProductColorSelectInput } from "./ProductColorSelectInput";
import { Meta, StoryFn } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: "UI / Features /Search /Inputs /ProductColorSelectInput",
  component: ProductColorSelectInput,
} as Meta<typeof ProductColorSelectInput>;

export const Default = {
  args: {
    colors: [
      {
        label: "Red",
        value: "#f52e20",
      },
      {
        label: "Green",
        value: "#27e339",
      },
      {
        label: "Blue",
        value: "#2739e3",
      },
    ],
  },
};
