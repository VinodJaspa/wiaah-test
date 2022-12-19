import { storybookSectionsTitle, AffiliationHistorySection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AffiliationHistorySection",
  component: AffiliationHistorySection,
} as ComponentMeta<typeof AffiliationHistorySection>;

export const Default = () => <AffiliationHistorySection />;
