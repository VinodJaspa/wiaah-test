import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { TimeRangeDisplay } from "./TimeRangeDisplay";

export default {
  title: storybookPartailsTitle + "TimeRangeDisplay",
  component: TimeRangeDisplay,
} as ComponentMeta<typeof TimeRangeDisplay>;

const template: ComponentStory<typeof TimeRangeDisplay> = (args) => (
  <TimeRangeDisplay {...args} />
);

export const Default = template.bind({});
Default.args = {
  rangeInMinutes: [40, 80],
};
