import { mount, ReactWrapper } from "enzyme";
import { getMountedComponent, getTestId } from "utils";
import React from "react";
import {
  RestaurantMyServiceCard,
  RestaurantMyServiceCardProps,
} from "./RestaurantMyServiceCard";
import { RecoilRoot } from "recoil";

const selectors = {
  editBtn: "EditServiceBtn",
  removeBtn: "RemoveServiceBtn",
};

describe("HolidayRentalsMyServiceCard", () => {
  let wrapper: ReactWrapper;
  let onRemoveMock: jest.Mock;
  let onEditMock: jest.Mock;
  let props: Omit<RestaurantMyServiceCardProps, "onEdit" | "onRemove"> = {
    location: {
      address: "street name",
      city: "Geneve",
      lat: 15,
      lon: 16,
      country: "switzerland",
      countryCode: "CHF",
      postalCode: 1565,
      state: "state",
    },
    id: "231",
    description: "desc",
    provider: "provider",
    thumbnail: "/shop-2.jpeg",
    title: "holiday  title",
    type: "restaurant",
    averagePrice: 35,
    discount: {
      amount: 30,
      rule: "a rule",
    },
    isGoodDeal: true,
    name: "restaurant",
    rate: 4.8,
    reviewsCount: 13654,
    tags: ["tag1", "tag2"],
    thumbnails: ["/shop-2.jpeg", "/shop-3.jpeg"],
  };

  beforeEach(() => {
    onEditMock = jest.fn();
    onRemoveMock = jest.fn();
    wrapper = mount(
      <RecoilRoot>
        <RestaurantMyServiceCard
          {...props}
          onEdit={onEditMock}
          onRemove={onRemoveMock}
        />
      </RecoilRoot>,
    );
  });

  it("should trigger on edit when edit btn is clicked", () => {
    getMountedComponent(wrapper, getTestId(selectors.editBtn)).simulate(
      "click",
    );
    expect(onEditMock).toBeCalledTimes(1);
    expect(onEditMock).toBeCalledWith(props.id);
  });

  it("should trigger onRemove when remove btn is clicked", () => {
    getMountedComponent(wrapper, getTestId(selectors.removeBtn)).simulate(
      "click",
    );
    expect(onRemoveMock).toBeCalledTimes(1);
    expect(onRemoveMock).toBeCalledWith(props.id);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
