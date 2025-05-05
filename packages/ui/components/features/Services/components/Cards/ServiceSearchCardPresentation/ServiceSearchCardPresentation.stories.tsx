import { Meta, StoryFn } from "@storybook/react";
import { ServicesRequestKeys } from "@UI";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServiceCardPresentation } from "./ServiceSearchCardPresentation";

export default {
  title: "UI / Features /Services /Data Display /ServiceSearchCardPresentation",
  component: ServiceCardPresentation,
} as Meta<typeof ServiceCardPresentation>;

export const Default = {
  args: {
    src: "/place-2.jpg",
    data: { id: "123" },
    serviceKey: ServicesRequestKeys.hotels,
  },
};
