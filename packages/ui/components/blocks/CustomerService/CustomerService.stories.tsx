import { CustomerService, storybookBlocksTitle } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "CustomerService",
  component: CustomerService,
} as ComponentMeta<typeof CustomerService>;

export const Default = () => <CustomerService />;
