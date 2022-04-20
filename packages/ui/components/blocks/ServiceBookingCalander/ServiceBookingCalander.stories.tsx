import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServiceBookingCalander } from "../";
export default {
  title: "UI/blocks/ServiceBookingCalander",
  component: ServiceBookingCalander,
} as ComponentMeta<typeof ServiceBookingCalander>;

const Templete: ComponentStory<typeof ServiceBookingCalander> = (args) => (
  <ServiceBookingCalander {...args} />
);

export const Default = Templete.bind({});
Default.args = {
  month: {
    name: "October",
    year: 2021,
    lastMonthDaysNum: 30,
    number: 10,
    daysNum: 31,
    firstDayName: "Fr",
    events: [],
  },
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <div className="flex h-[50rem] w-full justify-center bg-slate-200">
        <Story {...args} />
      </div>
    );
  },
];

export const DiffDate = Templete.bind({});
DiffDate.args = {
  month: {
    name: "Augests",
    year: 2020,
    lastMonthDaysNum: 30,
    number: 8,
    daysNum: 30,
    firstDayName: "Sa",
    events: [],
  },
};
DiffDate.decorators = [
  (Story, { args }) => {
    return (
      <div className="flex h-[50rem] w-full justify-center bg-slate-200">
        <Story {...args} />
      </div>
    );
  },
];

export const WithEvents = Templete.bind({});
WithEvents.args = {
  month: {
    name: "Augests",
    year: 2020,
    lastMonthDaysNum: 30,
    number: 8,
    daysNum: 30,
    firstDayName: "Sa",
    events: [
      {
        id: "1",
        day: 5,
        name: " event 1 ",
        availablity: true,
        from: "Augest 5, 2020 10:00:00",
        to: "Augest 5, 2020 11:00:00",
      },
      {
        id: "2",
        day: 10,
        name: " event 3 ",
        availablity: true,
        from: "Augest 10, 2020 13:00:00",
        to: "Augest 10, 2020 14:30:00",
      },
      {
        id: "3",
        day: 5,
        name: " event 2 ",
        availablity: true,
        from: "Augest 5, 2020 11:30:00",
        to: "Augest 5, 2020 13:30:00",
      },
    ],
  },
};
WithEvents.decorators = [
  (Story, { args }) => {
    return (
      <div className="flex h-[50rem] w-full justify-center bg-slate-200">
        <Story {...args} />
      </div>
    );
  },
];
