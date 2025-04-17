import { Collaboration, storybookBlocksTitle } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Collaboration",
  component: Collaboration,
} as Meta<typeof Collaboration>;

export const Default = () => <Collaboration />;
