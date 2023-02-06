import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { AddressBookSection } from ".";
import { useGetMyShippingAddressesQuery } from "@UI";
import { getTestId } from "utils";

jest.mock("@UI", () => ({
  ...jest.requireActual("@UI"),
  useGetMyShippingAddressesQuery: jest.fn(),
}));

const testids = {
  addressCard: "address-card",
};

let mockData = {
  isLoading: false,
  data: [
    {
      id: "id",
      location: {
        address: "address 1",
        city: "city 1",
        country: "countr 1",
        state: "state 1",
      },
      ownerId: "ow id",
      instractions: "1",
      phone: "test phone",
    },
    {
      id: "id 2",
      location: {
        address: "address 2",
        city: "city 2",
        country: "countr 2",
        state: "state 2",
      },
      ownerId: "ow id 2",
      instractions: "2",
      phone: "test phone 2",
    },
  ],
} as ReturnType<typeof useGetMyShippingAddressesQuery>;

describe("addressBookSection tests", () => {
  let wrapper: ShallowWrapper;

  let mockGetQuery = useGetMyShippingAddressesQuery as jest.Mock;

  beforeAll(() => {
    mockGetQuery.mockReturnValue(mockData);
    wrapper = shallow(<AddressBookSection />);
  });

  it("should display the right data", async () => {
    const cards = wrapper.find(getTestId(testids.addressCard));

    await Promise.all(
      cards.map(async (card, i) => {
        const data = mockData.data![i];

        expect(card.prop("addressInfo")).toEqual({
          addressName: data.location.address,
          mobileNumber: data.phone,
          instructions: data.instractions,
        });
      })
    );
  });
});
