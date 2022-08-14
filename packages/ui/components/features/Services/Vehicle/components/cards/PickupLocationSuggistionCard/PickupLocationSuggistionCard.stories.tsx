import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookVehicleCardsTitle } from "utils";
import { PickupLocationSuggistionCard } from "./PickupLocationSuggistionCard";

export default {
  title: storybookVehicleCardsTitle + "PickupLocationSuggistionCard",
  component: PickupLocationSuggistionCard,
} as ComponentMeta<typeof PickupLocationSuggistionCard>;

const template: ComponentStory<typeof PickupLocationSuggistionCard> = (
  args
) => <PickupLocationSuggistionCard {...args} />;

export const Default = template.bind({});
Default.args = {
  address: "address",
  city: "paris",
};
