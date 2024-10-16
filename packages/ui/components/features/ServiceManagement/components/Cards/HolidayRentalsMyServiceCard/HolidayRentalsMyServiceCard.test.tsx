import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";
import React from "react";
import {
  HolidayRentalsMyServiceCard,
  HolidayRentalsMyServiceCardProps,
} from "./HolidayRentalsMyServiceCard";

const selectors = {
  editBtn: "EditServiceBtn",
  removeBtn: "RemoveServiceBtn",
};

describe("HolidayRentalsMyServiceCard", () => {
  let wrapper: ShallowWrapper;
  let onRemoveMock: jest.Mock;
  let onEditMock: jest.Mock;
  let props: Omit<HolidayRentalsMyServiceCardProps, "onEdit" | "onRemove"> = {
    amenites: [
      {
        name: "Pool",
        slug: "pool",
      },
      {
        name: "Pet-friendly",
        slug: "pet-friendly",
      },
      {
        name: "Resturant",
        slug: "resturant",
      },
      {
        name: "Breakfast available",
        slug: "breakfast",
      },
      {
        name: "Parking available",
        slug: "parking",
      },
      {
        name: "Laundry",
        slug: "laundry",
      },
      {
        name: "Housekeeping",
        slug: "housekeeping",
      },
      {
        name: "Free Wifi",
        slug: "free_wifi",
      },
      {
        name: "Air conditioning",
        slug: "a/c",
      },
      {
        name: "Gym",
        slug: "gym",
      },
      {
        name: "Business services",
        slug: "business_services",
      },
      {
        name: "Bar",
        slug: "bar",
      },
      {
        name: "Room service",
        slug: "room_service",
      },
      {
        name: "24/7 front desk",
        slug: "24/7_front_desk",
      },
    ],
    cancelationPolicies: [
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
      {
        id: "4",
        cost: 0,
        duration: 0,
      },
    ],
    extras: [
      "No Extras",
      "Book now, pay later",
      "Breakfast",
      "Breakfast + Book now, pay later",
    ],
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
    pricePerNight: 500,
    provider: "provider",
    thumbnail: "/shop-2.jpeg",
    title: "holiday  title",
    type: "holiday_rentals",
  };

  beforeEach(() => {
    onEditMock = jest.fn();
    onRemoveMock = jest.fn();
    wrapper = shallow(
      <HolidayRentalsMyServiceCard
        {...props}
        onEdit={onEditMock}
        onRemove={onRemoveMock}
      />,
    );
  });

  it("should trigger on edit when edit btn is clicked", () => {
    wrapper.find(getTestId(selectors.editBtn)).simulate("click");
    expect(onEditMock).toBeCalledTimes(1);
    expect(onEditMock).toBeCalledWith(props.id);
  });

  it("should trigger onRemove when remove btn is clicked", () => {
    wrapper.find(getTestId(selectors.removeBtn)).simulate("click");
    expect(onRemoveMock).toBeCalledTimes(1);
    expect(onRemoveMock).toBeCalledWith(props.id);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
