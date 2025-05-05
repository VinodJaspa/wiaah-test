import { storybookPartailsTitle } from "utils";
import { Meta } from "@storybook/react";
import { Spinner } from "@UI";

export default {
  title: "UI / partials / Spinner",
  component: Spinner,
} as Meta<typeof Spinner>;

export const Default = () => <Spinner />;
