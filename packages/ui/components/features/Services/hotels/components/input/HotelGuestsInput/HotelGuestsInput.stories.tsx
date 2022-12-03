import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookHotelInputTitle } from "utils";
import { HotelGuestsInput } from "./HotelGuestsInput";

export default {
  title: storybookHotelInputTitle + "HotelGuestsInput",
} as ComponentMeta<typeof HotelGuestsInput>;

const template: ComponentStory<typeof HotelGuestsInput> = (args) => (
  <HotelGuestsInput {...args} />
);

export const Default = template.bind({});
Default.args = {
  name: "adults",
  description: "16+ years old",
};
