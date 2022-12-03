import { storybookSectionsTitle, AffiliationManagementSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AffiliationManagementSection",
  component: AffiliationManagementSection,
} as ComponentMeta<typeof AffiliationManagementSection>;

export const Default = () => <AffiliationManagementSection />;
