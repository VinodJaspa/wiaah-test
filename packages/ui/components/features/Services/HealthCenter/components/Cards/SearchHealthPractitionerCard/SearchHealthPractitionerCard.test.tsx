import React from "react";
import {
  SearchHealthPractitionerCard,
  SearchHealthPractitionerCardProps,
} from "./SearchHealthPractitionerCard";
import { ShallowWrapper, shallow } from "enzyme";
import { randomNum } from "utils";

describe("SearchHealthPractitionerCard tests", () => {
  let wrapper: ShallowWrapper;
  let props: SearchHealthPractitionerCardProps;
  beforeEach(() => {
    props = {
      practitioner: {
        location: {
          address: "Boulvard James-Fazy 4",
          city: "Geneve",
          cords: {
            lat: randomNum(100),
            lng: randomNum(100),
          },
          country: "france",
          countryCode: "CHF",
          state: "Geneve",
          postalCode: 1201,
        },
        id: `123`,
        rate: randomNum(15),
        name: "Dr Charlene Kasaven",
        photo:
          "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
        specialty: "Dentist",
      },
      searchQuery: "char",
    };
    wrapper = shallow(<SearchHealthPractitionerCard {...props} />);
  });
});
