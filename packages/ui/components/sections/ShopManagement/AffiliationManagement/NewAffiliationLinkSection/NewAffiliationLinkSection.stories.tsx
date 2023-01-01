import { storybookSectionsTitle, NewAffiliationLinkSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "NewAffiliationLinkSection",
  component: NewAffiliationLinkSection,
} as ComponentMeta<typeof NewAffiliationLinkSection>;

export const Default = () => <NewAffiliationLinkSection />;
