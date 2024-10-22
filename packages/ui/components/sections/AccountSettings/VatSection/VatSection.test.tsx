import { useUpdateMyShopMutation } from "@UI";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { VatSection } from "./VatSection";

jest.mock("@UI", () => ({
  ...jest.requireActual("@UI"),
  useUpdateMyShopMutation: jest
    .fn()
    .mockImplementation(() => ({ mutate: jest.fn() })),
}));

describe("Vat Section testing", () => {
  let wrapper: ShallowWrapper;
  let mockUseUpdateMyShop = useUpdateMyShopMutation as jest.Mock;
  let mockUpdateShop = jest.fn();

  beforeAll(() => {
    wrapper = shallow(<VatSection accountId="fake-3" />);
  });

  it("should call the updateShop mutation with the right data", async () => {
    expect(mockUseUpdateMyShop).toBeCalledTimes(1);
    expect(mockUpdateShop).toBeCalledTimes(0);
  });
});
