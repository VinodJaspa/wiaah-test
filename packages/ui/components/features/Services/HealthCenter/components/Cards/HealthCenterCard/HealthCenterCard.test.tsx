import React from "react";
import { HealthCenterCard, HealthCenterCardProps } from "./HealthCenterCard";
import { mount, ReactWrapper } from "enzyme";
import { getTestId, randomNum } from "utils";

const testids = {
  servicePresentation: "ServicePresentation",
  serviceInfo: "ServiceInfo",
};

let mockVisitService = jest.fn();
let serviceKey = "health_center";
jest.mock("routing", () => ({
  useRouting: () => ({
    visit(fn: (routes: any) => any) {
      fn({ visitService: mockVisitService });
    },
  }),
}));

describe("HealthCenterCard tests", () => {
  let wrapper: ReactWrapper;
  let props: HealthCenterCardProps;
  let servicePresentation: ReactWrapper;
  let serviceInfo: ReactWrapper;
  beforeEach(() => {
    props = {
      centerData: {
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
      workingDates: [
        {
          date: Date.now(),
          workingHoursRanges: [...Array(2)].map(() => ({
            from: Date.now(),
            to: Date.now(),
          })),
        },
        {
          date: Date.now(),
          workingHoursRanges: [...Array(1)].map(() => ({
            from: Date.now(),
            to: Date.now(),
          })),
        },
        {
          date: Date.now(),
          workingHoursRanges: [...Array(2)].map(() => ({
            from: Date.now(),
            to: Date.now(),
          })),
        },
        {
          date: Date.now(),
          workingHoursRanges: [...Array(1)].map(() => ({
            from: Date.now(),
            to: Date.now(),
          })),
        },
        {
          date: Date.now(),
          workingHoursRanges: [...Array(2)].map(() => ({
            from: Date.now(),
            to: Date.now(),
          })),
        },
      ],
    };
    wrapper = mount(<HealthCenterCard {...props} />);
    servicePresentation = wrapper.find(getTestId(testids.servicePresentation));
    serviceInfo = wrapper.find(getTestId(testids.serviceInfo));
  });

  it("should have AspectRatioImage component with the right props", () => {
    const img = servicePresentation.find("AspectRatioImage");
    expect(img.length).toBe(1);
    expect(img.props().src).toBe(props.centerData.photo);
    expect(img.props().alt).toBe(props.centerData.name);
  });
  it("should have a Button with Details text in the service presentation section that triggers visitService with the service data and service key", () => {
    const btn = servicePresentation.find("Button");
    expect(btn.length).toBe(1);
    expect(btn.text() === "Details");
    btn.simulate("click");
    expect(mockVisitService).toBeCalledWith(props.centerData, "health_center");
  });
  it("should contain the right service info in the ServiceInfo section", () => {
    expect(
      serviceInfo.findWhere(
        (node) => node.name() !== null && node.text() === props.centerData.name
      ).length
    ).toBe(1);
    expect(
      serviceInfo.findWhere(
        (node) =>
          node.name() !== null && node.text() === props.centerData.specialty
      ).length
    ).toBe(1);
    expect(
      serviceInfo.findWhere(
        (node) =>
          node.name() !== null &&
          node.text() === `${props.centerData.location.address}`
      ).length
    ).toBe(1);
    expect(
      serviceInfo.findWhere(
        (node) =>
          node.name() !== null &&
          node.text() ===
            `${props.centerData.location.postalCode} ${props.centerData.location.city}`
      )
    );
  });
  it("should have a WorkingDaysCalander component", () => {
    const calender = wrapper.find("WorkingDaysCalender");
    expect(calender.length).toBe(1);
    expect(calender.prop("workingDates")).toBe(props.workingDates);
  });
});
