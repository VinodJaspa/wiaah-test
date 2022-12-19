import { storybookSectionsTitle, PersonalizationAndDataSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "PersonalizationAndDataSection",
  component: PersonalizationAndDataSection,
} as ComponentMeta<typeof PersonalizationAndDataSection>;

export const Default = () => <PersonalizationAndDataSection />;
