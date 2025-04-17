import { storybookSectionsTitle, AffiliationManagementSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / AffiliationManagementSection",
  component: AffiliationManagementSection,
} as Meta<typeof AffiliationManagementSection>;

export const Default = () => <AffiliationManagementSection />;
