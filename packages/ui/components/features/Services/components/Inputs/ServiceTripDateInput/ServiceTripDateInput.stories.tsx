import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServiceTripDateInput } from "./ServiceTripDateInput";
import { storybookOtherServicesInputTitle } from "utils";

export default {
  title: storybookOtherServicesInputTitle + "ServiceTripDataInput",
  component: ServiceTripDateInput,
} as ComponentMeta<typeof ServiceTripDateInput>;

const template: ComponentStory<typeof ServiceTripDateInput> = (args) => (
  <ServiceTripDateInput {...args} />
);

export const Default = template.bind({});
