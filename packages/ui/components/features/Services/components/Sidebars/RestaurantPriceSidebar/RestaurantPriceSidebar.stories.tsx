import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookOtherServicesDataDisplayTitle } from "utils";
import { RestaurantPriceSidebar } from "./RestaurantPriceSidebar";

export default {
  title: "UI / Features /Services /Data Display /RestaurantPriceSidebar",
  component: RestaurantPriceSidebar,
} as Meta<typeof RestaurantPriceSidebar>;

export const Default = {
  args: {
    vatPercent: randomNum(15),
  },
};
