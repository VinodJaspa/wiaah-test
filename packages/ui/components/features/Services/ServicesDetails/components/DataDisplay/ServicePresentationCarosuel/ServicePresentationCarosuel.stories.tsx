import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServicePresentationCarosuel } from "./ServicePresentationCarosuel";

export default {
  title: "UI / Features /Services /Data Display /ServicePresentationCarosuel",
  component: ServicePresentationCarosuel,
} as Meta<typeof ServicePresentationCarosuel>;

export const Default = {
  args: {
    data: [...Array(15)].map(() => ({
      src: "/place-2.jpg",
      thumbnail: "/place-2.jpeg",
      type: "image",
    })),
  },
};
