import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { SearchHealthPractitionerCard } from "./SearchHealthPractitionerCard";

export default {
  title: "UI / Features /Health Center /Cards /SearchHealthPracitionerCard",
  component: SearchHealthPractitionerCard,
} as Meta<typeof SearchHealthPractitionerCard>;

export const Default = {
  args: {
    practitioner: {
      id: "123",
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
      name: "practitioner",
      photo:
        "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
      rate: randomNum(15),
      specialty: "dentist",
    },
    searchQuery: "",
  },
};

export const SearchHighlight = {
  args: {
    practitioner: {
      id: "123",
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
      name: "practitioner",
      photo:
        "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
      rate: randomNum(15),
      specialty: "dentist",
    },
    searchQuery: "titioner",
  },
};
