import { randomNum, storybookRestaurantSectionsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { ServiceReservastionForm } from "./ServiceReservastion";

export default {
  title: "UI / Features /Restaurant /Sections /ServiceReservation",
  component: ServiceReservastionForm,
} as Meta<typeof ServiceReservastionForm>;

const template: StoryFn<typeof ServiceReservastionForm> = (args) => {
  return <ServiceReservastionForm {...args} />;
};

export const Default = {
  render: template,
  args: {},
};
