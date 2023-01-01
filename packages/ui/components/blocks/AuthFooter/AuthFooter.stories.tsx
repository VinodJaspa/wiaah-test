import { storybookBlocksTitle, AuthFooter } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "AuthFooter",
  component: AuthFooter,
} as ComponentMeta<typeof AuthFooter>;

export const Default = () => <AuthFooter />;
