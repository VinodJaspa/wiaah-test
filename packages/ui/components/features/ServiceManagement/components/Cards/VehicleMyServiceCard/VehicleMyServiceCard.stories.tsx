import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookServiceManagementCardsTitle } from "utils";
import { VehicleMyServiceCard } from "./VehicleMyServiceCard";

export default {
  title: storybookServiceManagementCardsTitle + "VehicleMyServiceCard",
  component: VehicleMyServiceCard,
} as ComponentMeta<typeof VehicleMyServiceCard>;

const template: ComponentStory<typeof VehicleMyServiceCard> = (args) => (
  <VehicleMyServiceCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  id: "136",
  description: "Holiday Rentals description",
  provider: "Wiaah",
  title: "Holiday Rentals title",
  thumbnail: "/place-2.jpg",
  type: "vehicle",
};
