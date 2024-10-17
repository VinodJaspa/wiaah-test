import React from "react";
import { mount, shallow, ShallowWrapper } from "enzyme";
import {
  BeautyCenterTreatmentsList,
  BeautyCenterTreatmentsListProps,
} from "./BeautyCenterTreatmentsList";
import { randomNum } from "utils";
import { RecoilRoot } from "recoil";

const mockedTreatments: BeautyCenterTreatmentsListProps["treatments"] = [
  {
    __typename: "Treatment",
    beautyCenterServiceId: "bcs123",
    category: {
      createdAt: new Date().toISOString(), // Current timestamp
      createdById: "user123", // ID of the creator
      id: "cat123", // Unique ID for the category
      title: "Facial Treatments", // Title of the category
      updatedAt: new Date().toISOString(),
    },
    discount: {
      units: 5,
      value: 10.0, // 10% discount
    },
    duration: [30, 60],
    id: "treatment123",
    price: 120.0,
    thumbnail: "https://example.com/facial-thumbnail.jpg",
    title: "Relaxing Facial",
    treatmentCategoryId: "cat123",
  },
  {
    __typename: "Treatment",
    beautyCenterServiceId: "bcs124",
    category: {
      createdAt: new Date().toISOString(), // Current timestamp
      createdById: "user123", // ID of the creator
      id: "cat123", // Unique ID for the category
      title: "Facial Treatments", // Title of the category
      updatedAt: new Date().toISOString(),
    },
    discount: {
      units: 3,
      value: 15.0, // 15% discount
    },
    duration: [45, 90],
    id: "treatment124",
    price: 150.0,
    thumbnail: "https://example.com/massage-thumbnail.jpg",
    title: "Swedish Massage",
    treatmentCategoryId: "cat124",
  },
  {
    __typename: "Treatment",
    beautyCenterServiceId: "bcs125",
    category: {
      createdAt: new Date().toISOString(), // Current timestamp
      createdById: "user123", // ID of the creator
      id: "cat123", // Unique ID for the category
      title: "Facial Treatments", // Title of the category
      updatedAt: new Date().toISOString(),
    },
    discount: {
      units: 10,
      value: 5.0, // 5% discount
    },
    duration: [20, 40],
    id: "treatment125",
    price: 50.0,
    thumbnail: "https://example.com/manicure-thumbnail.jpg",
    title: "Classic Manicure",
    treatmentCategoryId: "cat125",
  },
];

let mockedCancilation = [
  {
    duration: 6,
    cost: 0,
    id: "1",
  },
  {
    duration: 10,
    cost: 10,
    id: "2",
  },
  {
    cost: 50,
    duration: 0,
    id: "3",
  },
];

describe("BeautyCenterTreatmentsList tests", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <BeautyCenterTreatmentsList
        cancelation={mockedCancilation}
        treatments={mockedTreatments}
      />,
    );
  });

  it("should render beautycentertreatments cards properly with the right props", () => {
    const treatments = wrapper.find("BeautyCenterTreatmentCard");
    expect(treatments.length).toBe(mockedTreatments.length);

    mockedTreatments.forEach((treatment, i) => {
      expect(treatments.at(i).props()).toEqual(
        expect.objectContaining(treatment),
      );
    });
  });
  it("should render serviceCancelationPolicyInput components properly with the right props", () => {
    const policies = wrapper.find("ServiceCancelationPolicyInput");
    expect(policies.length).toBe(mockedCancilation.length);

    mockedCancilation.forEach((policy, i) => {
      expect(policies.at(i).props().name).toBe("cancelationPolicy");
      expect(policies.at(i).props()).toEqual(expect.objectContaining(policy));
    });
  });
  it("should have a book now button", () => {
    const wrapper = mount(
      <RecoilRoot>
        <BeautyCenterTreatmentsList cancelation={[]} treatments={[]} />
      </RecoilRoot>,
    );
    expect(
      wrapper.findWhere((node) => {
        return node.name() === "Button" && node.text() === "Book now";
      }).length,
    ).toBe(1);
  });
});
