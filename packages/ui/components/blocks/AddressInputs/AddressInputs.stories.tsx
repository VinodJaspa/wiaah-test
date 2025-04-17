import { storybookBlocksTitle, AddressInputs } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / AddressInputs",
  component: AddressInputs,
} as Meta<typeof AddressInputs>;

export const Default = () => <AddressInputs />;
