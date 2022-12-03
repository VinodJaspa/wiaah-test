import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { HealthCenterDoctorCard } from "./HealthCenterDoctorCard";

export default {
  title: storybookHealthCenterCardsTitle + "HealthCenterDoctorCard",
  component: HealthCenterDoctorCard,
} as ComponentMeta<typeof HealthCenterDoctorCard>;

const template: ComponentStory<typeof HealthCenterDoctorCard> = (args) => (
  <HealthCenterDoctorCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  id: "123",
  name: "doctor",
  photo: "/place-2.jpg",
  price: randomNum(15),
  specialty: "dentist",
};
