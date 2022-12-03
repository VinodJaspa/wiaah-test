import { storybookPartailsTitle } from "utils";
import { QrcodeDisplay } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookPartailsTitle + "QrCodeDisplay",
  component: QrcodeDisplay,
} as ComponentMeta<typeof QrcodeDisplay>;

export const Default = () => <QrcodeDisplay value="198441.3215454642" />;
