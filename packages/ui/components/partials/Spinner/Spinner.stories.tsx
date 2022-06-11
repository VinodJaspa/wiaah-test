import { storybookPartailsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { Spinner } from "ui";

export default {
  title: storybookPartailsTitle + "Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

export const Default = () => <Spinner />;
