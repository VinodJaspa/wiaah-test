import { storybookSectionsTitle, PersonalInformationStep } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "PersonalInformationStep",
} as ComponentMeta<typeof PersonalInformationStep>;

export const Default = () => <PersonalInformationStep />;
