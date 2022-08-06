import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { ServiceReachOutSection } from "./ServiceReachOutSection";

export default {
  title: storybookOtherServicesSectionsTitle + "ServiceReachOutSection",
  component: ServiceReachOutSection,
} as ComponentMeta<typeof ServiceReachOutSection>;

const template: ComponentStory<typeof ServiceReachOutSection> = (args) => (
  <ServiceReachOutSection {...args} />
);

export const Default = template.bind({});
Default.args = {
  email: "Example@email.com",
  location: {
    address: "Rue du marche 34",
    city: "Geneve",
    country: "switzerland",
    cords: {
      lat: 45.464664,
      lng: 9.18854,
    },
    countryCode: "USA",
    state: "state",
    postalCode: 1204,
  },
  telephone: "101227879123",
};
