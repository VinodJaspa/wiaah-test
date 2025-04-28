import React from "react";
import { HealthCenterCard, HealthCenterCardProps } from "./HealthCenterCard";
import { mount, ReactWrapper } from "enzyme";
import { getTestId, randomNum } from "utils";
import { ServiceStatus } from "@features/Services/Services";
import { ServicePresentationType } from "@features/API";
import { ServicePaymentMethods } from "@UI/../api";

const testids = {
  servicePresentation: "ServicePresentation",
  serviceInfo: "ServiceInfo",
};

const mockVisitService = jest.fn();
const serviceKey = "health_center";
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
        healthCenter: {
          id: "43543",
          vat: 14,
          workingHours: {
            id: "1",
            weekdays: {
              mo: { periods: ["09:00 AM - 12:00 PM", "01:00 PM - 05:00 PM"] },
              tu: { periods: ["09:00 AM - 12:00 PM", "01:00 PM - 05:00 PM"] },
              we: { periods: ["09:00 AM - 12:00 PM", "01:00 PM - 05:00 PM"] },
              th: { periods: ["09:00 AM - 12:00 PM", "01:00 PM - 05:00 PM"] },
              fr: { periods: ["09:00 AM - 12:00 PM", "01:00 PM - 05:00 PM"] },
              sa: { periods: ["09:00 AM - 12:00 PM", "01:00 PM - 05:00 PM"] },
              su: { periods: ["09:00 AM - 12:00 PM", "01:00 PM - 05:00 PM"] },
            },
          },
          //@ts-ignore
          doctors: {},
          ownerId: "321",
          totalReviews: 43,
          status: ServiceStatus.Active,
          payment_methods: [ServicePaymentMethods.Cash],
          cancelationPolicies: [
            {
              id: "policy-1", // Unique identifier for the policy
              duration: 24, // Duration in hours
              cost: 50, // Cost associated with cancellation
            },
          ],
          serviceMetaInfo: {
            __typename: "ServiceMetaInfo",
            title: "Health Center A",
            description:
              "A comprehensive health center offering a range of services.",
            metaTagDescription:
              "Visit Health Center A for top-notch health services.",
            metaTagKeywords: ["health", "clinic", "services", "wellness"],
            hashtags: ["#HealthCenterA", "#Wellness", "#Healthcare"],
          },

          policies: [
            {
              __typename: "ServicePolicy",
              policyTitle: "Cancellation Policy",
              terms: [
                "Cancellations made 24 hours before the appointment will receive a full refund.",
                "Cancellations made less than 24 hours before the appointment will incur a 50% cancellation fee.",
              ],
            },
            {
              __typename: "ServicePolicy",
              policyTitle: "Privacy Policy",
              terms: [
                "Your information will not be shared with third parties without your consent.",
                "We use encryption to protect your personal information.",
              ],
            },
          ],
          presentations: [
            {
              type: ServicePresentationType.Img, // or ServicePresentationType.Vid
              src: "https://example.com/image.jpg",
            },
          ],
          rating: 4,
          contact: {
            address: "456 Elm Street",
            country: "Sample Country",
            state: "Sample State", // Optional
            city: "Sample City",
            email: "contact@sampleservice.com",
            phone: "+123-456-7890",
          },
          location: {
            address: "123 Main St",
            city: "Sample City",
            lat: 37.7749,
            lon: -122.4194,
            state: "Sample State", // optional
            country: "Sample Country",
            postalCode: 12345,
          },
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
    expect(img.props().src).toBe(props.centerData.__typename);
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
        (node) => node.name() !== null && node.text() === props.centerData.name,
      ).length,
    ).toBe(1);
    expect(
      serviceInfo.findWhere(
        (node) =>
          node.name() !== null &&
          node.text() === props.centerData.speciality.name,
      ).length,
    ).toBe(1);
    expect(
      serviceInfo.findWhere(
        (node) =>
          node.name() !== null &&
          node.text() === `${props.centerData.healthCenter.location}`,
      ).length,
    ).toBe(1);
    expect(
      serviceInfo.findWhere(
        (node) =>
          node.name() !== null &&
          node.text() ===
          `${props.centerData.healthCenter.location.postalCode} ${props.centerData.healthCenter.location.city}`,
      ),
    );
  });
  it("should have a WorkingDaysCalander component", () => {
    const calender = wrapper.find("WorkingDaysCalender");
    expect(calender.length).toBe(1);
    expect(calender.prop("workingDates")).toBe(props.workingDates);
  });
});
