import { NotificationsSettingsSection } from "@UI";
import { StorybookImplemntationLayout, storybookSectionsTitle } from "utils";
import React from "react";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / NotifiactionSettingsSection",
  component: NotificationsSettingsSection,
} as Meta<typeof NotificationsSettingsSection>;

export const Default = () => {
  return <NotificationsSettingsSection accountId="fake-3" />;
};
