import { HolidayRentalsMyServiceCard } from "./HolidayRentalsMyServiceCard";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title: storybookServiceManagementCardsTitle + "HolidayRentalsMyServiceCard",
  component: HolidayRentalsMyServiceCard,
} as ComponentMeta<typeof HolidayRentalsMyServiceCard>;

const template: ComponentStory<typeof HolidayRentalsMyServiceCard> = (args) => (
  <HolidayRentalsMyServiceCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  id: "136",
  description: "Holiday Rentals description",
  pricePerNight: 15,
  provider: "Wiaah",
  title: "Holiday Rentals title",
  thumbnail: "/place-2.jpg",
  type: "holiday_rentals",
};
