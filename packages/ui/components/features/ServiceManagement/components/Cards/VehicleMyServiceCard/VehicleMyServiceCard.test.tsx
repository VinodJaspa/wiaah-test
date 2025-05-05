import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";
import React from "react";
import {
  VehicleMyServiceCard,
  VehicleMyServiceCardProps,
} from "./VehicleMyServiceCard";

const selectors = {
  editBtn: "EditServiceBtn",
  removeBtn: "RemoveServiceBtn",
};

describe("VehicleMyServiceCard", () => {
  let wrapper: ShallowWrapper;
  let onRemoveMock: jest.Mock;
  let onEditMock: jest.Mock;
  const props: Omit<VehicleMyServiceCardProps, "onEdit" | "onRemove"> = {
    id: "231",
    description: "desc",
    provider: "provider",
    thumbnail: "/shop-2.jpeg",
    title: "holiday  title",
    type: "vehicle",

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
    vehicleProps: [
      {
        type: "a/c",
        value: true,
      },
      {
        type: "gps",
        value: true,
      },
      {
        type: "passengers",
        value: 5,
      },
      {
        type: "windows",
        value: 4,
      },
      {
        type: "bags",
        value: 3,
      },
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
    pricePerDay: 35,
  };

  beforeEach(() => {
    onEditMock = jest.fn();
    onRemoveMock = jest.fn();
    wrapper = shallow(
      <VehicleMyServiceCard
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
