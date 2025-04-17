import { storybookSectionsTitle, AffiliationForm } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / NewAffiliationLinkSection",
  component: AffiliationForm,
} as Meta<typeof AffiliationForm>;

export const Default = () => <AffiliationForm />;
