import { storybookSectionsTitle, PrivacySection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "PrivacySection",
} as ComponentMeta<typeof PrivacySection>;

export const Default = () => <PrivacySection />;
