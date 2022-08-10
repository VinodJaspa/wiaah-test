import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import {
  ServiceCheckoutCommonCardWrapper,
  ServiceCheckoutCommonCardWrapperProps,
} from "./ServiceCheckoutCommonCardWrapper";
import { randomNum } from "utils";

describe("ServiceCheckoutCommonCardWrapper tests", () => {
  let wrapper: ShallowWrapper;
  let props: ServiceCheckoutCommonCardWrapperProps;
  beforeEach(() => {
    props = {
      serviceType: "hotel",
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },
      rate: randomNum(5),
      refundingRule: {
        cost: 12,
        duration: 3,
        id: "12",
      },
      reviews: randomNum(153),
      thumbnail: "/place-1.jpg",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",
      duration: [30, 60],
      guests: randomNum(5),
      cashback: {
        amount: randomNum(20),
        type: "percent",
      },
      price: randomNum(500),
    };
    wrapper = shallow(<ServiceCheckoutCommonCardWrapper {...props} />);
  });

  it("should have AspectRatioImage component with the right props", () => {
    const image = wrapper.find("AspectRatioImage");
    expect(image.length).toBe(1);
    expect(image.props().src).toBe(props.thumbnail);
    expect(image.props().alt).toBe(props.title);
  });
  it("should have the CashbackBadge component with the right props", () => {
    const badge = wrapper.find("CashbackBadge");
    expect(badge.length).toBe(1);
    expect(badge.props()).toEqual(expect.objectContaining(props.cashback));
  });
  it("should display title", () => {
    expect(
      wrapper.findWhere((node) => node.text() === props.title).length
    ).toBeGreaterThan(1);
  });
  it("should display reviews", () => {
    expect(
      wrapper.findWhere((node) => node.text() === `${props.reviews} reviews`)
        .length
    ).toBeGreaterThan(1);
  });
  it("should display the rate out of 5 in a prenteces", () => {
    expect(
      wrapper.findWhere((node) => node.text() === `(${props.rate}/5)`).length
    ).toBe(1);
  });
  it("should display reason of the rating for the service", () => {
    const text = wrapper.findWhere(
      (node) =>
        node.text() ===
        `Guests rated this property ${props.rate}/${5} for ${props.rateReason}`
    );
    expect(text.length).toBeGreaterThan(1);
  });
  it("should have ServiceRefundableTypeDescription component with the right props", () => {
    const desc = wrapper.find("ServiceRefundableTypeDescription");
    expect(desc.length).toBe(1);
    expect(desc.props()).toEqual(expect.objectContaining(props.refundingRule));
  });
  it("should have ExclamationCircleIcon", () => {
    expect(wrapper.find("ExclamationCircleIcon").length).toBe(1);
  });
  it("should display the guests if the guests probs is provided otherwise unmount it", () => {
    expect(
      wrapper.findWhere((node) => node.text() === `Guests:${props.guests}`)
        .length
    ).toBe(1);
    const { guests: _, ...rest } = props;
    wrapper = shallow(
      <ServiceCheckoutCommonCardWrapper guests={null} {...rest} />
    );

    expect(
      wrapper.findWhere((node) => node.text() === `Guests:${props.guests}`)
        .length
    ).toBe(0);
  });
});
