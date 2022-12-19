import { storybookSectionsTitle, PrivacySection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "PrivacySection",
} as ComponentMeta<typeof PrivacySection>;

export const Default = () => <PrivacySection />;
