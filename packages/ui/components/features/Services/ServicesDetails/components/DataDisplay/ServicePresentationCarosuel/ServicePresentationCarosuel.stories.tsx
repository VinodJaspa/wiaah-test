import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServicePresentationCarosuel } from "./ServicePresentationCarosuel";

export default {
  title: storybookOtherServicesDataDisplayTitle + "ServicePresentationCarosuel",
  component: ServicePresentationCarosuel,
} as ComponentMeta<typeof ServicePresentationCarosuel>;

const template: ComponentStory<typeof ServicePresentationCarosuel> = (args) => (
  <ServicePresentationCarosuel {...args} />
);

export const Default = template.bind({});
Default.args = {
  data: [...Array(15)].map(() => ({
    src: "/place-2.jpg",
    thumbnail: "/place-2.jpeg",
    type: "image",
  })),
};
