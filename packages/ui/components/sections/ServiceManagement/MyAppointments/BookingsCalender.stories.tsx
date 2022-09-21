import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BookingsCalenderSection } from "./BookingsCalender";
import { storybookSectionsTitle } from "utils";

export default {
  title: storybookSectionsTitle + "BookingsCalender",
  component: BookingsCalenderSection,
} as ComponentMeta<typeof BookingsCalenderSection>;

const template: ComponentStory<typeof BookingsCalenderSection> = (args) => (
  <BookingsCalenderSection {...args} />
);

export const Default = template.bind({});
Default.args = {};
