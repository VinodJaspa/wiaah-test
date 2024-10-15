import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";
import { LocationSearchInput } from "./LocationSearchInput";

export default {
  title: storybookDataInputBlocksTitle + "LocationSearchInput",
  component: LocationSearchInput,
} as ComponentMeta<typeof LocationSearchInput>;

const template: ComponentStory<typeof LocationSearchInput> = () => {
  return <LocationSearchInput onLocationSelect={() => { }} />;
};

export const Default = template.bind({});
Default.args = {};
