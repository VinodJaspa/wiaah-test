import { storybookBlocksTitle, AuthFooter } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / AuthFooter",
  component: AuthFooter,
} as Meta<typeof AuthFooter>;

export const Default = () => <AuthFooter />;
