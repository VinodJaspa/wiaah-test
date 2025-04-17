import { storybookHealthCenterCardsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { HealthCenterDoctorsList } from "./HealthCenterDoctorsList";
import React from "react";

export default {
  title: "UI / Features /Health Center /Cards /HealthCenterSearchBox",
  component: HealthCenterDoctorsList,
} as Meta<typeof HealthCenterDoctorsList>;

const template: StoryFn<typeof HealthCenterDoctorsList> = (args) => {
  return <HealthCenterDoctorsList {...args} />;
};

export const Default = {
  render: template,
  args: {},
};
