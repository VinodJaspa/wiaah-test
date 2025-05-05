import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookRestaurantListsTitle } from "utils";
import { ResturantMenuList } from "./ResturantMenuList";

export default {
  title: "UI / Features /Restaurant /Lists /RestaurantMenuList1",
  component: ResturantMenuList,
} as Meta<typeof ResturantMenuList>;

export const Default = {
  args: {
    listTitle: "menu list",
    menuItems: [...Array(10)].map(() => ({
      id: "1",
      price: randomNum(153),
      title: "menu item",
    })),
  },
};
