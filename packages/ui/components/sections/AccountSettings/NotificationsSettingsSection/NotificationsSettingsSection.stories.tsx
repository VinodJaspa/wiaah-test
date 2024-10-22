import { NotificationsSettingsSection } from "@UI";
import { StorybookImplemntationLayout, storybookSectionsTitle } from "utils";
import React from "react";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "NotifiactionSettingsSection",
  component: NotificationsSettingsSection,
} as ComponentMeta<typeof NotificationsSettingsSection>;

export const Default = () => {
  return <NotificationsSettingsSection accountId="fake-3" />;
};
