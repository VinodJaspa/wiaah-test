import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookRestaurantListsTitle } from "utils";
import { ResturantMenuList } from "./ResturantMenuList";

export default {
  title: storybookRestaurantListsTitle + "RestaurantMenuList",
  component: ResturantMenuList,
} as ComponentMeta<typeof ResturantMenuList>;

const template: ComponentStory<typeof ResturantMenuList> = (args) => (
  <ResturantMenuList {...args} />
);

export const Default = template.bind({});
Default.args = {
  listTitle: "menu list",
  menuItems: [...Array(10)].map(() => ({
    id: "1",
    price: randomNum(153),
    title: "menu item",
  })),
};
