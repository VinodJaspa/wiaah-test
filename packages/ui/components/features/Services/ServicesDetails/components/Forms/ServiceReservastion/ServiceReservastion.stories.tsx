import { randomNum, storybookRestaurantSectionsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServiceReservastion } from "./ServiceReservastion";

export default {
  title: storybookRestaurantSectionsTitle + "ServiceReservation",
  component: ServiceReservastion,
} as ComponentMeta<typeof ServiceReservastion>;

const template: ComponentStory<typeof ServiceReservastion> = (args) => {
  return <ServiceReservastion {...args} />;
};

export const Default = template.bind({});
Default.args = {};
