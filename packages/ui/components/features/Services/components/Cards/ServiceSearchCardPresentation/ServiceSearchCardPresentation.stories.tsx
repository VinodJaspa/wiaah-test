import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServiceCardPresentation } from "./ServiceSearchCardPresentation";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServicesRequestKeys } from "@UI";

export default {
  title:
    storybookOtherServicesDataDisplayTitle + "ServiceSearchCardPresentation",
  component: ServiceCardPresentation,
} as ComponentMeta<typeof ServiceCardPresentation>;

const template: ComponentStory<typeof ServiceCardPresentation> = (args) => (
  <ServiceCardPresentation {...args} />
);

export const Default = template.bind({});
Default.args = {
  src: "/place-2.jpg",
  data: { id: "123" },
  serviceKey: ServicesRequestKeys.hotels,
};
