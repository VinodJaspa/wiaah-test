import { Meta, StoryFn } from "@storybook/react";
import { storybookServiceManagementCardsTitle } from "utils";
import { VehicleMyServiceCard } from "./VehicleMyServiceCard";

export default {
  title: "UI / Features /Service Management /Cards /VehicleMyServiceCard",
  component: VehicleMyServiceCard,
} as Meta<typeof VehicleMyServiceCard>;

export const Default = {
  args: {
    id: "136",
    description: "Holiday Rentals description",
    provider: "Wiaah",
    title: "Holiday Rentals title",
    thumbnail: "/place-2.jpg",
    type: "vehicle",
  },
};
