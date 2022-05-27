import React from "react";
import { ComponentMeta } from "@storybook/react";
import { DisplayDate, storybookDataFormatingTitle } from "ui";
export default {
  title: storybookDataFormatingTitle + "DisplayDate",
  component: DisplayDate,
} as ComponentMeta<typeof DisplayDate>;

export const Default = () => (
  <DisplayDate date={new Date(Date.now()).toDateString()} />
);
