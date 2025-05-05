import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { HealthCenterCard, HealthCenterCardProps } from "./HealthCenterCard";
import React from "react";

export default {
  title: "UI / Features /Health Center /Cards /HealthCenterCard",
  component: HealthCenterCard,
} as Meta<typeof HealthCenterCard>;

export const Default = {
  args: {
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
  },
};
