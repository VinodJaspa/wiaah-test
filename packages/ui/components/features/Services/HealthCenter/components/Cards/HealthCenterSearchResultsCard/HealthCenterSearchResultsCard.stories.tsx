import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  HealthCenterSearchResultsCard,
  HealthCenterSearchResultsCardProps,
} from "./HealthCenterSearchResultsCard";
import React from "react";

export default {
  title: storybookHealthCenterCardsTitle + "HealthCenterSearchResultsCard",
  component: HealthCenterSearchResultsCard,
} as ComponentMeta<typeof HealthCenterSearchResultsCard>;

const template: ComponentStory<typeof HealthCenterSearchResultsCard> = (
  args
) => (
  <div className="w-64">
    <HealthCenterSearchResultsCard {...args} />
  </div>
);

export const Default: { args: HealthCenterSearchResultsCardProps } =
  template.bind({});
Default.args = {
  practitioner: {
    location: {
      address: "Boulvard James-Fazy 4",
      city: "Geneve",
      cords: {
        lat: randomNum(100),
        lng: randomNum(100),
      },
      country: "france",
      postalCode: 1201,
    },
    name: "Dr Charlene Kasaven",
    photo:
      "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
    specialty: "Dentist",
  },
};
