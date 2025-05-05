import { Meta, StoryFn } from "@storybook/react";
import { HotelMyServiceCard } from "./HotelMyServiceCard";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title: "UI / Features /Service Management /Cards /HotelMyServiceCard",
  component: HotelMyServiceCard,
} as Meta<typeof HotelMyServiceCard>;

export const Default = {
  args: {
    id: "136",
    description: "Holiday Rentals description",
    pricePerNight: 15,
    provider: "Wiaah",
    title: "Holiday Rentals title",
    thumbnail: "/place-2.jpg",
    type: "hotel",
  },
};
