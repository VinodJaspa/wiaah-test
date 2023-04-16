import { randomNum, storybookRestaurantSectionsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServiceReservastionForm } from "./ServiceReservastion";

export default {
  title: storybookRestaurantSectionsTitle + "ServiceReservation",
  component: ServiceReservastionForm,
} as ComponentMeta<typeof ServiceReservastionForm>;

const template: ComponentStory<typeof ServiceReservastionForm> = (args) => {
  return <ServiceReservastionForm {...args} />;
};

export const Default = template.bind({});
Default.args = {};
