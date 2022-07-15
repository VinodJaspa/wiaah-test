import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  PractitionerSearchResultsCard,
  PractitionerSearchResultsCardProps,
} from "./PractitionerSearchResultsCard";
import React from "react";

export default {
  title: storybookHealthCenterCardsTitle + "PractitionerSearchResultsCard",
  component: PractitionerSearchResultsCard,
} as ComponentMeta<typeof PractitionerSearchResultsCard>;

const template: ComponentStory<typeof PractitionerSearchResultsCard> = (
  args
) => (
  <div className="w-64">
    <PractitionerSearchResultsCard {...args} />
  </div>
);

export const Default: { args: PractitionerSearchResultsCardProps } =
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
