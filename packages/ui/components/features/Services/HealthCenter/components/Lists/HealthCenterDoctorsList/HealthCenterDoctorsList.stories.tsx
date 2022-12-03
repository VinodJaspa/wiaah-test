import { storybookHealthCenterCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HealthCenterDoctorsList } from "./HealthCenterDoctorsList";
import React from "react";

export default {
  title: storybookHealthCenterCardsTitle + "HealthCenterSearchBox",
  component: HealthCenterDoctorsList,
} as ComponentMeta<typeof HealthCenterDoctorsList>;

const template: ComponentStory<typeof HealthCenterDoctorsList> = (args) => {
  return <HealthCenterDoctorsList {...args} />;
};

export const Default = template.bind({});
Default.args = {};
