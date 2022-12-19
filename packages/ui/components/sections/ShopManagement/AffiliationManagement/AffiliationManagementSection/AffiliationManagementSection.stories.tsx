import { storybookSectionsTitle, AffiliationManagementSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AffiliationManagementSection",
  component: AffiliationManagementSection,
} as ComponentMeta<typeof AffiliationManagementSection>;

export const Default = () => <AffiliationManagementSection />;
