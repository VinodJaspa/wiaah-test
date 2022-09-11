import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { ServicesProviderDescriptionSection } from "./ServicesProviderDescriptionSection";

export default {
  title:
    storybookOtherServicesSectionsTitle + "ServiceProviderDescriptionSection",
  component: ServicesProviderDescriptionSection,
} as ComponentMeta<typeof ServicesProviderDescriptionSection>;

const template: ComponentStory<typeof ServicesProviderDescriptionSection> = (
  args
) => <ServicesProviderDescriptionSection {...args} />;

export const Default = template.bind({});
Default.args = {
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
  bathrooms: 2,
  bedrooms: 2,
  bikes: 1,
  cars: 2,
  pets: 0,
};
