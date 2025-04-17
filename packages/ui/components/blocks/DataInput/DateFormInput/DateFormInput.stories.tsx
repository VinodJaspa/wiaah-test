import { DateFormInput } from "@UI";
import { storybookDataInputBlocksTitle } from "utils";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  title: "UI / blocks / Data Input /DateFormInput",
  component: DateFormInput,
} as Meta<typeof DateFormInput>;

export const Default = () => <DateFormInput />;
