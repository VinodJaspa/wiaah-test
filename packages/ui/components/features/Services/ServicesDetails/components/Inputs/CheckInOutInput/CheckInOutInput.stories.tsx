import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { storybookOtherServicesInputTitle } from "utils";
import { CheckInOutInput } from "./CheckInOutInput";

export default {
  title: storybookOtherServicesInputTitle + "CheckInOutInput",
  component: CheckInOutInput,
} as ComponentMeta<typeof CheckInOutInput>;

const template: ComponentStory<typeof CheckInOutInput> = (args) => (
  <CheckInOutInput {...args} />
);

export const Default = template.bind({});
Default.args = {};

export const inActive = template.bind({});
inActive.args = {
  active: false,
};

export const Controlled = template.bind({});
Controlled.decorators = [
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
];
