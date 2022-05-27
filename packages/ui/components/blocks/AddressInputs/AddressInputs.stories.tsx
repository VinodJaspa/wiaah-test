import { storybookBlocksTitle, AddressInputs } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "AddressInputs",
  component: AddressInputs,
} as ComponentMeta<typeof AddressInputs>;

export const Default = () => <AddressInputs />;
