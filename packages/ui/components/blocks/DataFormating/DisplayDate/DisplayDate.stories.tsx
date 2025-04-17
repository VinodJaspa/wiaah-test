import React from "react";
import { Meta } from "@storybook/react";
import { DisplayDate, storybookDataFormatingTitle } from "@UI";
export default {
  title: "UI / blocks / Data Formating /DisplayDate",
  component: DisplayDate,
} as Meta<typeof DisplayDate>;

export const Default = () => (
  <DisplayDate date={new Date(Date.now()).toDateString()} />
);
