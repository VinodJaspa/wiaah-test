import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TimeManagementSection } from "./index";
import { storybookServiceManagementSectionsTitle } from "utils";

export default {
  title: storybookServiceManagementSectionsTitle + "TimeManagementSection",
  component: TimeManagementSection,
} as ComponentMeta<typeof TimeManagementSection>;

const template: ComponentStory<typeof TimeManagementSection> = (args) => (
  <TimeManagementSection {...args} />
);

export const Default = template.bind({});
Default.args = {};
