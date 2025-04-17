import { storybookBlocksTitle, LocationButton } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / LocationButton",
  component: LocationButton,
} as Meta<typeof LocationButton>;

export const Default = () => {
  return <LocationButton name="location" />;
};
