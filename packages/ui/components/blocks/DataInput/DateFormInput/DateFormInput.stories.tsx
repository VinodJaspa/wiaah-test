import { DateFormInput } from "ui";
import { storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import React from "react";

export default {
  title: storybookDataInputBlocksTitle + "DateFormInput",
  component: DateFormInput,
} as ComponentMeta<typeof DateFormInput>;

export const Default = () => <DateFormInput />;
