import { storybookDataDisplayBlocksTitle, DurationDisplay } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Data Display /DurationDisplay",
  component: DurationDisplay,
} as Meta<typeof DurationDisplay>;

export const Default = () => <DurationDisplay duration={215} />;
