import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { HealthCenterDoctorCard } from "./HealthCenterDoctorCard";

export default {
  title: "UI / Features /Health Center /Cards /HealthCenterDoctorCard1",
  component: HealthCenterDoctorCard,
} as Meta<typeof HealthCenterDoctorCard>;

export const Default = {
  args: {
    id: "123",
    name: "doctor",
    photo: "/place-2.jpg",
    price: randomNum(15),
    specialty: "dentist",
  },
};
