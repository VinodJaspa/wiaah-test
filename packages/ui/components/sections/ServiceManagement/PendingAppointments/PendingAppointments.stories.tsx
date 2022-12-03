import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PendingAppointmentsSection } from "./index";
import { storybookServiceManagementSectionsTitle } from "utils";

export default {
  title: storybookServiceManagementSectionsTitle + "PendingAppointments",
  component: PendingAppointmentsSection,
} as ComponentMeta<typeof PendingAppointmentsSection>;

const template: ComponentStory<typeof PendingAppointmentsSection> = (args) => (
  <PendingAppointmentsSection {...args} />
);

export const Default = template.bind({});
Default.args = {};
