import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { storybookOtherServicesInputTitle } from "utils";
import { CheckInOutInput } from "./CheckInOutInput";

export default {
  title: "UI / Features /Services /Inputs /CheckInOutInput",
  component: CheckInOutInput,
} as Meta<typeof CheckInOutInput>;

export const Default = {
  args: {},
};

export const inActive = {
  args: {
    active: false,
  },
};

export const Controlled = {
  decorators: [
    (Story) => {
      const [checkin, setCheckin] = React.useState<Date>(new Date());
      const [checkout, setCheckout] = React.useState<Date>(new Date());
      const [daysdiff, setDayDiff] = React.useState<number | null>(null);

      return (
        <div>
          <Story
            args={{
              checkin,
              checkout,
              onDatesChange(checkIn, checkout, daysdiff) {
                setCheckin(checkIn);
                setCheckout(checkout);
                setDayDiff(daysdiff);
              },
            }}
          />
          <p>days diff {daysdiff}</p>
        </div>
      );
    },
  ],
};
