import React from "react";
import { mount, shallow, ShallowWrapper } from "enzyme";
import { BeautyCenterTreatmentsList } from "./BeautyCenterTreatmentsList";
import {
  BeautyCenterTreatmentDataType,
  ServiceCancelationPolicyType,
} from "api";
import { randomNum } from "utils";
import { RecoilRoot } from "recoil";

let mockedTreatments: BeautyCenterTreatmentDataType[] = [
  {
    id: "132",
    category: "Facial",
    title: "Hydro pro skin facial",
    durationInMinutes: [30, 60],
    price: randomNum(50),
    discount: randomNum(60),
  },
  {
    id: "132",
    category: "Facial",
    title: "Hydro facial with chemical peel",
    durationInMinutes: [30, 60],
    price: randomNum(50),
    discount: randomNum(60),
  },
  {
    id: "132",
    category: "Facial",
    title: "Hydro pro skin facial",
    durationInMinutes: [30, 60],
    price: randomNum(50),
    discount: randomNum(60),
  },
  {
    id: "132",
    category: "Facial",
    title: "Hydro facial with chemical peel",
    durationInMinutes: [30, 60],
    price: randomNum(50),
    discount: randomNum(60),
  },
  {
    id: "132",
    category: "Facial",
    title: "Hydro pro skin facial",
    durationInMinutes: [30, 60],
    price: randomNum(50),
    discount: randomNum(60),
  },
  {
    id: "132",
    category: "Facial",
    title: "Hydro facial with chemical peel",
    durationInMinutes: [30, 60],
    price: randomNum(50),
    discount: randomNum(60),
  },
  {
    id: "132",
    category: "Facial",
    title: "Hydro pro skin facial",
    durationInMinutes: [30, 60],
    price: randomNum(50),
    discount: randomNum(60),
  },
  {
    id: "132",
    category: "Facial",
    title: "Hydro facial with chemical peel",
    durationInMinutes: [30, 60],
    price: randomNum(50),
    discount: randomNum(60),
  },
  {
    category: "Facial",
    id: "132",
    title: "Hydro pro skin facial",
    durationInMinutes: [30, 60],
    price: randomNum(50),
    discount: randomNum(60),
  },
  {
    id: "132",
    category: "Facial",
    title: "Hydro facial with chemical peel",
    durationInMinutes: [30, 60],
    price: randomNum(50),
    discount: randomNum(60),
  },
];
let mockedCancilation: ServiceCancelationPolicyType[] = [
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
      />
    );
  });

  it("should render beautycentertreatments cards properly with the right props", () => {
    const treatments = wrapper.find("BeautyCenterTreatmentCard");
    expect(treatments.length).toBe(mockedTreatments.length);

    mockedTreatments.forEach((treatment, i) => {
      expect(treatments.at(i).props()).toEqual(
        expect.objectContaining(treatment)
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
      </RecoilRoot>
    );
    expect(
      wrapper.findWhere((node) => {
        return node.name() === "Button" && node.text() === "Book now";
      }).length
    ).toBe(1);
  });
});
