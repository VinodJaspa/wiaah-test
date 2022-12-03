import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HealthCenterCard, HealthCenterCardProps } from "./HealthCenterCard";
import React from "react";

export default {
  title: storybookHealthCenterCardsTitle + "HealthCenterCard",
  component: HealthCenterCard,
} as ComponentMeta<typeof HealthCenterCard>;

const template: ComponentStory<typeof HealthCenterCard> = (args) => (
  <HealthCenterCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  centerData: {
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
  workingDates: [
    {
      date: Date.now(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(1)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(1)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
  ],
};
