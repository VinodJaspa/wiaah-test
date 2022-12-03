import { randomNum, storybookRestaurantSectionsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResturantMenuListSection } from "./ResturantMenuListSection";

export default {
  title: storybookRestaurantSectionsTitle + "RestaurantMenuListSection",
  component: ResturantMenuListSection,
} as ComponentMeta<typeof ResturantMenuListSection>;

const template: ComponentStory<typeof ResturantMenuListSection> = (args) => {
  return <ResturantMenuListSection {...args} />;
};

export const Default = template.bind({});

Default.args = {
  menus: [...Array(4)].map((_, i) => ({
    listTitle: "list-" + i,
    menuItems: [...Array(10)].map(() => ({
      id: "1",
      price: randomNum(153),
      title: "menu item",
    })),
  })),
  cancelation: [
    {
      cost: 0,
      duration: 0,
      id: "123",
    },
  ],
};
