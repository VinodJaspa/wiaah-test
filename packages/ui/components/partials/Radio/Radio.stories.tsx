import { storybookPartailsTitle } from "utils";
import { Radio } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / partials / Radio",
  component: Radio,
} as Meta<typeof Radio>;

export const Default = () => <Radio />;
