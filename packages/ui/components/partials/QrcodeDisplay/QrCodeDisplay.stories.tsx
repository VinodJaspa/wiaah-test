import { storybookPartailsTitle } from "utils";
import { QrcodeDisplay } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / partials / QrCodeDisplay",
  component: QrcodeDisplay,
} as Meta<typeof QrcodeDisplay>;

export const Default = () => <QrcodeDisplay value="198441.3215454642" />;
