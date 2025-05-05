import { AccountVerification, storybookSectionsTitle } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / AccountVerification",
  component: AccountVerification,
} as Meta<typeof AccountVerification>;

export const Default = () => {
  return <AccountVerification />;
};
