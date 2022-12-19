import { storybookBlocksTitle, LocationButton } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "LocationButton",
  component: LocationButton,
} as ComponentMeta<typeof LocationButton>;

export const Default = () => {
  return <LocationButton name="location" />;
};
