import { CustomerService, storybookBlocksTitle } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / CustomerService",
  component: CustomerService,
} as Meta<typeof CustomerService>;

export const Default = () => <CustomerService />;
