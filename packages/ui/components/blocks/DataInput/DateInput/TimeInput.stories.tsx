import { storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TimeInput } from "./TimeInput";

export default {
  title: storybookDataInputBlocksTitle + "TimeInput",
  component: TimeInput,
} as ComponentMeta<typeof TimeInput>;

const template: ComponentStory<typeof TimeInput> = (args) => (
  <TimeInput {...args} />
);

export const Default = template.bind({});
Default.args = {
  timeRange: {
    from: { hour: 8, minutes: 30 },
    to: { hour: 20, minutes: 30 },
  },
};
