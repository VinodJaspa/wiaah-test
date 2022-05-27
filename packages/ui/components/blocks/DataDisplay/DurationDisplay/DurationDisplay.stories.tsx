import { storybookDataDisplayBlocksTitle, DurationDisplay } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookDataDisplayBlocksTitle + "DurationDisplay",
  component: DurationDisplay,
} as ComponentMeta<typeof DurationDisplay>;

export const Default = () => <DurationDisplay duration={215} />;
