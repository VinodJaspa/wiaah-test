import React from "react";
import {
  SearchHealthPractitionerCard,
  SearchHealthPractitionerCardProps,
} from "./SearchHealthPractitionerCard";
import { ShallowWrapper, shallow } from "enzyme";
import { FilterNodeByText, randomNum } from "utils";

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
  it("should have Avatar component with the right props", () => {
    expect(wrapper.find("Avatar").length).toBe(1);
    expect(wrapper.find("Avatar").props().src).toBe(props.practitioner.photo);
  });
  it("should display the practitioner specialty and city", () => {
    expect(
      wrapper.findWhere(
        FilterNodeByText(
          `${props.practitioner.specialty}, ${props.practitioner.location.city}`
        )
      ).length
    ).toBe(1);
  });
  it("should have HighlightText components with the right props", () => {
    const highlight = wrapper.find("HighlightText");
    expect(highlight.length).toBe(1);
    expect(highlight.prop("text")).toBe(props.practitioner.name);
    expect(highlight.prop("toHighlight")).toBe(props.searchQuery);
  });
});
