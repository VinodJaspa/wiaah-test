import { Meta, StoryFn } from "@storybook/react";
import { AddMenuDishInput } from "./AddMenuDishInput";
import { storybookRestaurantInputTitle } from "utils";

export default {
  title: "UI / Features /Restaurant /Inputs /AddMenuDishInput",
  component: AddMenuDishInput,
} as Meta<typeof AddMenuDishInput>;

export const Default = {
  args: {},
};
