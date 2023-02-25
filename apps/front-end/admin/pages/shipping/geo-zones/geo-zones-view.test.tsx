import { ShippingType } from "@features/API";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { useAdminGetShippingSettings } from "ui";
import GeozoneView from "./index";

jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useAdminGetShippingSettings: jest.fn(),
}));

describe("geo-zone view tests", () => {
  let wrapper: ShallowWrapper;

  let mockUseAdminGetShippingSettings =
    useAdminGetShippingSettings as jest.Mock;

  let mockdata: ReturnType<typeof useAdminGetShippingSettings>["data"] = [
    {
      description: "desc 1",
      id: "1",
      name: "name 1",
      type: ShippingType.Paid,
    },
    {
      description: "desc 2",
      id: "2",
      name: "name 2",
      type: ShippingType.Paid,
    },
  ];

  beforeEach(() => {
    mockUseAdminGetShippingSettings.mockReturnValue({ data: mockdata });
    wrapper = shallow(<GeozoneView />);
  });

  it("it should display the right zones", () => {
    expect(mockUseAdminGetShippingSettings).toBeCalledTimes(1);
  });
});
