import { storybookSectionsTitle, AffiliationForm } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "NewAffiliationLinkSection",
  component: AffiliationForm,
} as ComponentMeta<typeof AffiliationForm>;

export const Default = () => <AffiliationForm />;
