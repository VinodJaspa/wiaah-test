import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { SearchHealthPractitionersCardsList } from "./SearchHealthPractitionersCardsList";

export default {
  title: storybookHealthCenterCardsTitle + "HealthCenterDoctorCard",
  component: SearchHealthPractitionersCardsList,
} as ComponentMeta<typeof SearchHealthPractitionersCardsList>;

const template: ComponentStory<typeof SearchHealthPractitionersCardsList> = (
  args
) => <SearchHealthPractitionersCardsList {...args} />;

export const Default = template.bind({});
Default.args = {
  practitioners: [...Array(15)].map(() => ({
    id: "123",
    location: {
      address: "Boulvard James-Fazy 4",
      city: "Geneve",
      cords: {
        lat: randomNum(100),
        lng: randomNum(100),
      },
      country: "france",
      postalCode: 1201,
      countryCode: "CHF",
      state: "Geneve",
    },
    name: "practitioner",
    photo:
      "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
    rate: randomNum(15),
    specialty: "dentist",
  })),
  searchQuery: "prac",
};
