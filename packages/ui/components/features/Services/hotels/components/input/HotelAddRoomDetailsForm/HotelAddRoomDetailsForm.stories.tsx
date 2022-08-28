import { HotelAddRoomDetailsForm } from "./HotelAddRoomDetailsForm";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookHotelInputTitle } from "utils";

export default {
  title: storybookHotelInputTitle + "HotelAddRoomDetailsForm",
  component: HotelAddRoomDetailsForm,
} as ComponentMeta<typeof HotelAddRoomDetailsForm>;

const template: ComponentStory<typeof HotelAddRoomDetailsForm> = (args) => (
  <HotelAddRoomDetailsForm {...args} />
);

export const Default = template.bind({});
Default.args = {};
