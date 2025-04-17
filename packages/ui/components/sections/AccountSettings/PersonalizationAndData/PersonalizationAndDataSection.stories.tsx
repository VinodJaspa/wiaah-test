import { storybookSectionsTitle, PersonalizationAndDataSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / PersonalizationAndDataSection",
  component: PersonalizationAndDataSection,
} as Meta<typeof PersonalizationAndDataSection>;

export const Default = () => <PersonalizationAndDataSection />;
