import { HealthCenterAddDoctorForm } from "./HealthCenterAddDoctorForm";
import { storybookHealthCenterInputsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookHealthCenterInputsTitle + "HealthCenterAddDoctorForm",
  component: HealthCenterAddDoctorForm,
} as ComponentMeta<typeof HealthCenterAddDoctorForm>;

const template: ComponentStory<typeof HealthCenterAddDoctorForm> = (args) => (
  <HealthCenterAddDoctorForm {...args} />
);

export const Default = template.bind({});
Default.args = {};
