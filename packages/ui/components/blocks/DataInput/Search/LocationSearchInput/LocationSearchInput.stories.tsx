import { Meta, StoryFn } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";
import { LocationSearchInput } from "./LocationSearchInput";

export default {
  title: "UI / blocks / Data Input /LocationSearchInput",
  component: LocationSearchInput,
} as Meta<typeof LocationSearchInput>;

const template: StoryFn<typeof LocationSearchInput> = () => {
  return <LocationSearchInput onLocationSelect={() => {}} />;
};

export const Default = {
  render: template,
  args: {},
};
