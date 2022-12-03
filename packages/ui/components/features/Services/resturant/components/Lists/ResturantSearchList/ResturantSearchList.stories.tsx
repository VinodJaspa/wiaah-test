import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookRestaurantListsTitle } from "utils";
import { ResturantSearchList } from "./ResturantSearchList";

export default {
  title: storybookRestaurantListsTitle + "RestaurantMenuList",
  component: ResturantSearchList,
} as ComponentMeta<typeof ResturantSearchList>;

const template: ComponentStory<typeof ResturantSearchList> = (args) => (
  <ResturantSearchList {...args} />
);

export const Default = template.bind({});
Default.args = {};
