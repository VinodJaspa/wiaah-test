import { storybookBlocksTitle, AddressInputs } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "AddressInputs",
  component: AddressInputs,
} as ComponentMeta<typeof AddressInputs>;

export const Default = () => <AddressInputs />;
