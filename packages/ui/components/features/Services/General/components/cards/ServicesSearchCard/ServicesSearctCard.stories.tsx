import { storybookOtherServicesCardsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import {
  ServicesSearchCard,
  ServicesSearchCardProps,
} from "./ServicesSearchCard";

export default {
  title: "UI / Features /Services /Cards /ServicesSearchCard",
  component: ServicesSearchCard,
} as Meta<typeof ServicesSearchCard>;

export const Default = {
  args: {
    serviceData: {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      name: "D'Luxe Nails",
      location: {
        address: "Rue du Cendrier 14",
        city: "Geneve",
        cords: {
          lat: 50,
          lng: 30,
        },
        country: "switzerland",
        postalCode: 1201,
        countryCode: "CHF",
        state: "Geneve",
      },
      id: "123",
      isNew: true,
      thumbnail: "/place-3.jpg",
      services: [
        "Manucure Classique",
        "Manucure avec Shellac",
        "Shellac sans Manucure",
      ],
    },
  },
};

export const Vertical = {
  args: {
    vertical: true,
    serviceData: {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      name: "D'Luxe Nails",
      location: {
        address: "Rue du Cendrier 14",
        city: "Geneve",
        cords: {
          lat: 50,
          lng: 30,
        },
        country: "switzerland",
        postalCode: 1201,
        countryCode: "CHF",
        state: "Geneve",
      },
      id: "123",
      isNew: true,
      thumbnail: "/place-3.jpg",
      services: [
        "Manucure Classique",
        "Manucure avec Shellac",
        "Shellac sans Manucure",
      ],
    },
  },
};
