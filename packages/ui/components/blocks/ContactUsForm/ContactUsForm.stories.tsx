import { ContactUsForm, storybookBlocksTitle } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "ContactUsForm",
  component: ContactUsForm,
} as ComponentMeta<typeof ContactUsForm>;

export const Default = () => <ContactUsForm />;
