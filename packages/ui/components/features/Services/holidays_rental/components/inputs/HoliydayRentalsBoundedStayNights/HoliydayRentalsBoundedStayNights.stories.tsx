import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HoliydayRentalsBoundedStayNightsInput } from "./HoliydayRentalsBoundedStayNights";
import { storybookHolidayRentalsInputTitle } from "utils";

export default {
  title: storybookHolidayRentalsInputTitle + "HolidayRentalsBoundedStayNights",
  component: HoliydayRentalsBoundedStayNightsInput,
} as ComponentMeta<typeof HoliydayRentalsBoundedStayNightsInput>;

const template: ComponentStory<typeof HoliydayRentalsBoundedStayNightsInput> = (
  args
) => <HoliydayRentalsBoundedStayNightsInput {...args} />;

export const Default = template.bind({});
Default.args = {};
