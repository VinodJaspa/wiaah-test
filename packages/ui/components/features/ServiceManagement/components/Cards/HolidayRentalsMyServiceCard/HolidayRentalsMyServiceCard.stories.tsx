import { HolidayRentalsMyServiceCard } from "./HolidayRentalsMyServiceCard";
import { Meta, StoryFn } from "@storybook/react";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title:
    "UI / Features /Service Management /Cards /HolidayRentalsMyServiceCard",
  component: HolidayRentalsMyServiceCard,
} as Meta<typeof HolidayRentalsMyServiceCard>;

export const Default = {
  args: {
    id: "136",
    description: "Holiday Rentals description",
    pricePerNight: 15,
    provider: "Wiaah",
    title: "Holiday Rentals title",
    thumbnail: "/place-2.jpg",
    type: "holiday_rentals",
  },
};
