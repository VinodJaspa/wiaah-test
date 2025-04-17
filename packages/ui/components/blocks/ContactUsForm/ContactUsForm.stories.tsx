import { ContactUsForm, storybookBlocksTitle } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / ContactUsForm",
  component: ContactUsForm,
} as Meta<typeof ContactUsForm>;

export const Default = () => <ContactUsForm />;
