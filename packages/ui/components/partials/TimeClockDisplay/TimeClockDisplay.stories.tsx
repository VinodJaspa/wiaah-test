import { TimeClockDisplay } from "./TimeClockDisplay";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookPartailsTitle } from "utils";

export default {
  title: storybookPartailsTitle + "TimeClockDisplay",
  component: TimeClockDisplay,
} as ComponentMeta<typeof TimeClockDisplay>;

const template: ComponentStory<typeof TimeClockDisplay> = (args) => (
  <div className="w-11 h-11 text-primary">
    <TimeClockDisplay {...args} />
  </div>
);

export const Default = template.bind({});
Default.args = {
  from: new Date(2022, 8, 11, 15),
  to: new Date(2022, 8, 11, 19),
};
