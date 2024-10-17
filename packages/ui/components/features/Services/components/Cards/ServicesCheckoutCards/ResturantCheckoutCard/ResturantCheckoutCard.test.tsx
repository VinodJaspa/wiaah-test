import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import {
  ResturantCheckoutCard,
  ResturantCheckoutCardProps,
} from "./ResturantCheckoutCard";
import { getTestId, randomNum } from "utils";
import { ServiceType } from "@features/API/gql/generated";

const testids = {
  bookedMenusContainer: "BookedMenusContainer",
};

const senctence =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero perferendis fugit error unde, adipisci possimus totam mollitia? Inventore odio soluta nisi magnam vitae id voluptatum cum atque maiores nihil";

describe("ResturantCheckoutCard tests", () => {
  let wrapper: ShallowWrapper;
  let props: ResturantCheckoutCardProps;
  beforeEach(() => {
    props = {
      serviceType: ServiceType.Restaurant,
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: null,
      },

      rate: randomNum(5),
      refundingRule: {
        cost: 0,
        duration: 0,
        id: "12",
      },
      reviews: randomNum(153),
      thumbnail:
        "https://digital.ihg.com/is/image/ihg/crowne-plaza-jeddah-5499645385-2x1",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",
      duration: [30, 60],
      bookedMenus: [
        {
          price: randomNum(100),
          qty: randomNum(10),
          title: senctence.slice(0, randomNum(senctence.length)),
        },
        {
          price: randomNum(100),
          qty: randomNum(10),
          title: senctence.slice(0, randomNum(senctence.length)),
        },
        {
          price: randomNum(100),
          qty: randomNum(10),
          title: senctence.slice(0, randomNum(senctence.length)),
        },
      ],
      guests: randomNum(5),
      cashback: {
        amount: randomNum(20),
        type: "percent",
      },

      price: randomNum(500),
    };
    wrapper = shallow(<ResturantCheckoutCard {...props} />);
  });
  it("should be contained in the ServiceCheckoutCommonCardWrapper", () => {
    expect(wrapper.name()).toBe("ServiceCheckoutCommonCardWrapper");
  });
  it("should have the text 'Booked menus'", () => {
    const container = wrapper.find(getTestId(testids.bookedMenusContainer));
    expect(container.length).toBe(1);
    expect(container.text()).toContain("Booked menus");
  });
  it("should render BookedMenuCard component for every booked menu", () => {
    const bookedMenuCards = wrapper.find("BookedMenuCard");
    expect(bookedMenuCards.length).toBe(props.bookedMenus.length);
    bookedMenuCards.forEach((item, i) => {
      expect(item.props()).toEqual(
        expect.objectContaining(props.bookedMenus[i]),
      );
    });
  });
});
