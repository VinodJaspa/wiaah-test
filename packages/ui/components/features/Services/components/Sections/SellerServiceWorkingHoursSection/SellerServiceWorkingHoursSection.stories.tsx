import { Meta, StoryFn } from "@storybook/react";
import { SellerServiceWorkingHoursSection } from "./SellerServiceWorkingHoursSection";
import { storybookOtherServicesSectionsTitle } from "utils";

export default {
  title: "UI / Features /Services /Sections /SellerServiceWorkingHoursSetion",
  component: SellerServiceWorkingHoursSection,
} as Meta<typeof SellerServiceWorkingHoursSection>;

export const Default = {
  args: {
    workingDays: [...Array(7)].map(() => ({
      from: new Date(2022, 8, 11, 15),
      to: new Date(2022, 8, 11, 19),
      weekDay: "Sunday",
    })),
  },
};
