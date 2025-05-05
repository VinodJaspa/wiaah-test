import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import {
  PractitionerSearchResultsCard,
  PractitionerSearchResultsCardProps,
} from "./PractitionerSearchResultsCard";
import React from "react";

export default {
  title: "UI / Features /Health Center /Cards /PractitionerSearchResultsCard",
  component: PractitionerSearchResultsCard,
} as Meta<typeof PractitionerSearchResultsCard>;

const template: StoryFn<typeof PractitionerSearchResultsCard> = (args) => (
  <div className="w-64">
    <PractitionerSearchResultsCard {...args} />
  </div>
);

export const Default = {
  render: template,

  args: {
    practitioner: {
      id: "123",
      rate: randomNum(15),
      location: {
        address: "Boulvard James-Fazy 4",
        city: "Geneve",
        cords: {
          lat: randomNum(100),
          lng: randomNum(100),
        },
        country: "france",
        postalCode: 1201,
        countryCode: "CHF",
        state: "Geneve",
      },
      name: "Dr Charlene Kasaven",
      photo:
        "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
      specialty: "Dentist",
    },
  },
};
