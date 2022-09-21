import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BookingsHistorySection } from "./BookingsHistory";
import { storybookSectionsTitle } from "utils";

export default {
  title: storybookSectionsTitle + "BookingsHistory",
  component: BookingsHistorySection,
} as ComponentMeta<typeof BookingsHistorySection>;

const template: ComponentStory<typeof BookingsHistorySection> = (args) => (
  <BookingsHistorySection {...args} />
);

export const Default = template.bind({});
Default.args = {};
