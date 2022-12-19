import { ContactUsForm, storybookBlocksTitle } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "ContactUsForm",
  component: ContactUsForm,
} as ComponentMeta<typeof ContactUsForm>;

export const Default = () => <ContactUsForm />;
