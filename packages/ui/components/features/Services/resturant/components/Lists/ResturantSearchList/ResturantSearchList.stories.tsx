import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookRestaurantListsTitle } from "utils";
import { ResturantSearchList } from "./ResturantSearchList";

export default {
  title: "UI / Features /Restaurant /Lists /RestaurantMenuList",
  component: ResturantSearchList,
} as Meta<typeof ResturantSearchList>;

export const Default = {
  args: {},
};
