import { Meta, StoryFn } from "@storybook/react";
import { storybookVehicleCardsTitle } from "utils";
import { PickupLocationSuggistionCard } from "./PickupLocationSuggistionCard";

export default {
  title: "UI / Features /Vehicle /Cards /PickupLocationSuggistionCard",
  component: PickupLocationSuggistionCard,
} as Meta<typeof PickupLocationSuggistionCard>;

export const Default = {
  args: {
    address: "address",
    city: "paris",
  },
};
