import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { getTestId } from "utils";
import {
  HealthCenterMyServiceCard,
  HealthCenterMyServiceCardProps,
} from "./HealthCenterMyServiceCard";

const selectors = {
  editBtn: "EditServiceBtn",
  removeBtn: "RemoveServiceBtn",
};

describe("HealthCenterMyServiceCard", () => {
  let wrapper: ShallowWrapper;
  let onRemoveMock: jest.Mock;
  let onEditMock: jest.Mock;
  let props: Omit<HealthCenterMyServiceCardProps, "onEdit" | "onRemove"> = {
    id: "4",
    title: "beauty center service",
    description: "beauty center service description",
    type: "health_center",
    provider: "beauty center provider name",
    thumbnail: "/place-2.jpeg",
    location: {
      address: "address",
      city: "city",
      cords: {
        lat: 16,
        lng: 32,
      },
      country: "country",
      countryCode: "CH",
      postalCode: 1345123,
      state: "state",
    },
    specialty: "Dentist",
    workingDates: [
      {
        date: 0,
        workingHoursRanges: [
          {
            from: new Date(2022, 8, 20).toString(),
            to: new Date(2022, 8, 19).toString(),
          },
        ],
      },
      {
        date: 1,
        workingHoursRanges: [
          {
            from: new Date(2022, 8, 20).toString(),
            to: new Date(2022, 8, 19).toString(),
          },
        ],
      },
      {
        date: 2,
        workingHoursRanges: [
          {
            from: new Date(2022, 8, 20).toString(),
            to: new Date(2022, 8, 19).toString(),
          },
        ],
      },
      {
        date: 3,
        workingHoursRanges: [
          {
            from: new Date(2022, 8, 20).toString(),
            to: new Date(2022, 8, 19).toString(),
          },
        ],
      },
      {
        date: 4,
        workingHoursRanges: [
          {
            from: new Date(2022, 8, 20).toString(),
            to: new Date(2022, 8, 19).toString(),
          },
        ],
      },
      {
        date: 5,
        workingHoursRanges: [
          {
            from: new Date(2022, 8, 20).toString(),
            to: new Date(2022, 8, 19).toString(),
          },
        ],
      },
      {
        date: 6,
        workingHoursRanges: [
          {
            from: new Date(2022, 8, 20).toString(),
            to: new Date(2022, 8, 19).toString(),
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    onEditMock = jest.fn();
    onRemoveMock = jest.fn();
    wrapper = shallow(
      <HealthCenterMyServiceCard
        {...props}
        onEdit={onEditMock}
        onRemove={onRemoveMock}
      />
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
