import { Meta, StoryFn } from "@storybook/react";
import { RestaurantMyServiceCard } from "./RestaurantMyServiceCard";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title: "UI / Features /Service Management /Cards /RestaurantMyServiceCard",
  component: RestaurantMyServiceCard,
} as Meta<typeof RestaurantMyServiceCard>;

export const Default = {
  args: {
    id: "136",
    description: "Holiday Rentals description",
    provider: "Wiaah",
    title: "Holiday Rentals title",
    thumbnail: "/place-2.jpg",
    type: "restaurant",
  },
};
