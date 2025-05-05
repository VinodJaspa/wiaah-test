import { Meta, StoryFn } from "@storybook/react";
import { HoliydayRentalsBoundedStayNightsInput } from "./HoliydayRentalsBoundedStayNights";
import { storybookHolidayRentalsInputTitle } from "utils";

export default {
  title:
    "UI / Features /Holiday Rentals /Inputs /HolidayRentalsBoundedStayNights",
  component: HoliydayRentalsBoundedStayNightsInput,
} as Meta<typeof HoliydayRentalsBoundedStayNightsInput>;

export const Default = {
  args: {},
};
