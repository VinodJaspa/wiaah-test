import { randomNum, storybookRestaurantSectionsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { ResturantMenuListSection } from "./ResturantMenuListSection";

export default {
  title: "UI / Features /Restaurant /Sections /RestaurantMenuListSection",
  component: ResturantMenuListSection,
} as Meta<typeof ResturantMenuListSection>;

const template: StoryFn<typeof ResturantMenuListSection> = (args) => {
  return <ResturantMenuListSection {...args} />;
};

export const Default = {
  render: template,

  args: {
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
  },
};
