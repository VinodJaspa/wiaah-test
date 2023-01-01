import { storybookPartailsTitle } from "utils";
import { Radio } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookPartailsTitle + "Radio",
  component: Radio,
} as ComponentMeta<typeof Radio>;

export const Default = () => <Radio />;
