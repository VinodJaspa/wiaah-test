import { useGetFilteredBuyers } from "@UI";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import AdminBuyersView from "./index";

jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useGetFilteredBuyers: jest.fn(),
}));

describe("admin buyer list tests", () => {
  let wrapper: ShallowWrapper;

  let mockGetFilteredBuyersHook = useGetFilteredBuyers as jest.Mock;

  beforeAll(() => {
    mockGetFilteredBuyersHook.mockReturnValue({
      data: [],
    });
    wrapper = shallow(<AdminBuyersView></AdminBuyersView>);
  });

  it("should get buyers and display it", async () => {
    expect(mockGetFilteredBuyersHook).toBeCalled();
  });
});
