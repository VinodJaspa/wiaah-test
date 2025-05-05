import { CategoriesSelectInput } from "./CategoriesSelectInput";
import { Meta, StoryFn } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: "UI / Features /Search /Inputs /CategoriesSelectInput",
  component: CategoriesSelectInput,
} as Meta<typeof CategoriesSelectInput>;

export const Default = {
  args: {
    categories: [...Array(15)].map((_, i) => `category-${i}`),
  },
};
