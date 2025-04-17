import { storybookPartailsTitle } from "utils";
import { Meta } from "@storybook/react";
import { MathPowerDisplay } from "@UI";

export default {
  title: "UI / partials / MathPowerDisplay",
  component: MathPowerDisplay,
} as Meta<typeof MathPowerDisplay>;

export const Default = () => <MathPowerDisplay power={2}>M</MathPowerDisplay>;
