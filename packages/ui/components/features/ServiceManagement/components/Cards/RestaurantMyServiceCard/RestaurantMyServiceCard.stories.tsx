import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RestaurantMyServiceCard } from "./RestaurantMyServiceCard";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title: storybookServiceManagementCardsTitle + "RestaurantMyServiceCard",
  component: RestaurantMyServiceCard,
} as ComponentMeta<typeof RestaurantMyServiceCard>;

const template: ComponentStory<typeof RestaurantMyServiceCard> = (args) => (
  <RestaurantMyServiceCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  id: "136",
  description: "Holiday Rentals description",
  provider: "Wiaah",
  title: "Holiday Rentals title",
  thumbnail: "/place-2.jpg",
  type: "restaurant",
};
