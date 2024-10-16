import React from "react";
import {
  PractitionerSearchResultsCard,
  PractitionerSearchResultsCardProps,
} from "./PractitionerSearchResultsCard";
import { ShallowWrapper, shallow } from "enzyme";
import { getTestId, randomNum } from "utils";

const testids = {
  serviceInfoSection: "ServiceInfoSection",
};

describe("PractitionerSearchResultsCard tests", () => {
  let wrapper: ShallowWrapper;
  let props: PractitionerSearchResultsCardProps;
  beforeEach(() => {
    props = {
      practitioner: {
        reviews: 4,
        location: {
          address: "Boulvard James-Fazy 4",
          city: "Geneve",
          lat: randomNum(100),
          lon: randomNum(100),
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
    };
    wrapper = shallow(<PractitionerSearchResultsCard {...props} />);
  });

  it("should contain the right service info in the ServiceInfo section", () => {
    const serviceInfo = wrapper.find(getTestId(testids.serviceInfoSection));
    expect(
      serviceInfo.findWhere(
        (node) =>
          node.name() !== null && node.text() === props.practitioner.name,
      ).length,
    ).toBe(1);
    expect(
      serviceInfo.findWhere(
        (node) =>
          node.name() !== null && node.text() === props.practitioner.specialty,
      ).length,
    ).toBe(1);
    expect(
      serviceInfo.findWhere(
        (node) =>
          node.name() !== null &&
          node.text() === `${props.practitioner.location.address}`,
      ).length,
    ).toBe(1);
    expect(
      serviceInfo.findWhere(
        (node) =>
          node.name() !== null &&
          node.text() ===
          `${props.practitioner.location.postalCode} ${props.practitioner.location.city}`,
      ),
    );
  });

  it("should render ServiceCardPresentation component with the right props", () => {
    const cardPresenetation = wrapper.find("ServiceCardPresentation");
    expect(cardPresenetation.length).toBe(1);
    expect(cardPresenetation.prop("src")).toBe(props.practitioner.photo);
    expect(cardPresenetation.prop("alt")).toBe(props.practitioner.name);
    expect(cardPresenetation.prop("data")).toBe(props.practitioner);
    expect(cardPresenetation.prop("serviceKey")).toBe("health_center");
  });
  //   it("should ");
});
