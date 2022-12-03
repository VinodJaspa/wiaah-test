import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { ServiceOnMapLocalizationSection } from "./ServiceLocalizationSection";

export default {
  title:
    storybookOtherServicesSectionsTitle + "ServiceOnMapLocalizationSection",
  component: ServiceOnMapLocalizationSection,
} as ComponentMeta<typeof ServiceOnMapLocalizationSection>;

const template: ComponentStory<typeof ServiceOnMapLocalizationSection> = (
  args
) => <ServiceOnMapLocalizationSection {...args} />;

export const Default = template.bind({});
Default.args = {
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
};
Default.decorators = [
  (Story, args) => (
    <div className="w-[50vw]">
      <Story />
    </div>
  ),
];
