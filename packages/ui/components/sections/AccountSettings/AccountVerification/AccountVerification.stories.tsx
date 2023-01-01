import { AccountVerification, storybookSectionsTitle } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AccountVerification",
  component: AccountVerification,
} as ComponentMeta<typeof AccountVerification>;

export const Default = () => {
  return <AccountVerification />;
};
