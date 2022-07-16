import { storybookOtherServicesCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  ServicesSearchCard,
  ServicesSearchCardProps,
} from "./ServicesSearchCard";

export default {
  title: storybookOtherServicesCardsTitle + "ServicesSearchCard",
  component: ServicesSearchCard,
} as ComponentMeta<typeof ServicesSearchCard>;

const template: ComponentStory<typeof ServicesSearchCard> = (args) => (
  <ServicesSearchCard {...args} />
);

export const Default: { args: ServicesSearchCardProps } = template.bind({});
Default.args = {
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
    },
    isNew: true,
    thumbnail: "/place-3.jpg",
    services: [
      "Manucure Classique",
      "Manucure avec Shellac",
      "Shellac sans Manucure",
    ],
  },
};
export const Vertical: { args: ServicesSearchCardProps } = template.bind({});
Vertical.args = {
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
    },
    isNew: true,
    thumbnail: "/place-3.jpg",
    services: [
      "Manucure Classique",
      "Manucure avec Shellac",
      "Shellac sans Manucure",
    ],
  },
};
