import { Collaboration, storybookBlocksTitle } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "Collaboration",
  component: Collaboration,
} as ComponentMeta<typeof Collaboration>;

export const Default = () => <Collaboration />;
