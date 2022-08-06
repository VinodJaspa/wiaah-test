import {
  randomNum,
  storybookOtherServicesDataDisplayTitle,
  storybookOtherServicesHeadersTitle,
} from "utils";
import { ServicesProviderHeader } from "./ServicesProviderHeader";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookOtherServicesHeadersTitle + "ServiceProviderHeader",
  component: ServicesProviderHeader,
} as ComponentMeta<typeof ServicesProviderHeader>;

const template: ComponentStory<typeof ServicesProviderHeader> = (args) => (
  <ServicesProviderHeader {...args} />
);

export const Default = template.bind({});
Default.args = {
  name: "service provider",
  rating: randomNum(15),
  reviewsCount: randomNum(200),
  thumbnail: "/place-2.jpeg",
};

export const WithTravelPeriod = template.bind({});
WithTravelPeriod.args = {
  name: "service provider",
  rating: randomNum(15),
  reviewsCount: randomNum(200),
  thumbnail: "/place-2.jpg",
  travelPeriod: {
    arrival: new Date().toString(),
    departure: new Date().toString(),
  },
};
