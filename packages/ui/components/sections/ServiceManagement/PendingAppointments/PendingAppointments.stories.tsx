import { Meta, StoryFn } from "@storybook/react";
import { PendingAppointmentsSection } from "./index";
import { storybookServiceManagementSectionsTitle } from "utils";

export default {
  title: "UI / Features /Service Management /Sections /PendingAppointments",
  component: PendingAppointmentsSection,
} as Meta<typeof PendingAppointmentsSection>;

export const Default = {
  args: {},
};
