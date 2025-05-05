import { Meta, StoryFn } from "@storybook/react";
import { WrappedMap } from "./WrappedMap";
import { storybookGoogleMapsTitle } from "utils";

// Default export with title and component
export default {
  title: "Google map / WrappedMap",
  component: WrappedMap,
} as Meta<typeof WrappedMap>;

export const Default = {
  args: {
    zoom: 10,
    latitude: 37.7749,
    longitude: -122.4194,
  },
};
