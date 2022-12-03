import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HotelMyServiceCard } from "./HotelMyServiceCard";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title: storybookServiceManagementCardsTitle + "HotelMyServiceCard",
  component: HotelMyServiceCard,
} as ComponentMeta<typeof HotelMyServiceCard>;

const template: ComponentStory<typeof HotelMyServiceCard> = (args) => (
  <HotelMyServiceCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  id: "136",
  description: "Holiday Rentals description",
  pricePerNight: 15,
  provider: "Wiaah",
  title: "Holiday Rentals title",
  thumbnail: "/place-2.jpg",
  type: "hotel",
};
