import { storybookSectionsTitle, AffiliationListSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AffiliationListSection",
  component: AffiliationListSection,
} as ComponentMeta<typeof AffiliationListSection>;

export const Default = () => <AffiliationListSection />;
