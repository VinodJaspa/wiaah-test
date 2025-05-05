import { storybookSectionsTitle, AffiliationListSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / AffiliationListSection",
  component: AffiliationListSection,
} as Meta<typeof AffiliationListSection>;

export const Default = () => <AffiliationListSection />;
