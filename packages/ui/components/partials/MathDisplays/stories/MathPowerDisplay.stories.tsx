import { storybookPartailsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { MathPowerDisplay } from "@UI";

export default {
  title: storybookPartailsTitle + "MathPowerDisplay",
  component: MathPowerDisplay,
} as ComponentMeta<typeof MathPowerDisplay>;

export const Default = () => <MathPowerDisplay power={2}>M</MathPowerDisplay>;
