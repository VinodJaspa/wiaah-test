import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SpecialSchedule } from "./SpecialSchedule";
import { storybookServiceManagementSectionsTitle } from "utils";

export default {
  title: storybookServiceManagementSectionsTitle + "SpecialSchedule",
  component: SpecialSchedule,
} as ComponentMeta<typeof SpecialSchedule>;

const template: ComponentStory<typeof SpecialSchedule> = (args) => (
  <SpecialSchedule {...args} />
);

export const Default = template.bind({});
Default.args = {};
