import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import { OrderDetailsModal } from "./OrderDetailsModal";

const mockUseGetOrderDetailsQuery = jest.fn();
jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useGetOrderDetailsQuery: (...props: any) => {
    mockUseGetOrderDetailsQuery(...props);
    return {
      data: {
        data: {
          payment: {
            method: "Visa",
            value: "5841",
          },
          orderId: "123465",
          orderedDate: new Date().toString(),
          deliveryDate: new Date().toString(),
          deliveryAddress: {
            address: "address",
            city: "city",
            cords: {
              lat: 15,
              lng: 61,
            },
            country: "country",
            countryCode: "CHF",
            postalCode: 1332,
            state: "state",
          },
          products: [
            {
              location: {
                address: "address",
                city: "city",
                cords: {
                  lat: 15,
                  lng: 16,
                },
                country: "country",
                countryCode: "CH",
                postalCode: 13254,
                state: "state",
              },
              id: "2",
              thumbnail:
                "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
              name: "item1",
              price: 15,
              qty: 3,
              shippingMethods: [
                {
                  cost: 15,
                  description: "test",
                  id: "12",
                  deliveryTime: {
                    from: 5,
                    to: 7,
                  },
                  name: "European union",
                  value: "european_union",
                },
                {
                  cost: 0,
                  description: "test",
                  id: "12",
                  deliveryTime: {
                    from: 1,
                    to: 3,
                  },
                  name: "Click & Collect",
                  value: "click_and_collect",
                },
                {
                  cost: 20,
                  description: "test",
                  id: "12",
                  deliveryTime: {
                    from: 6,
                    to: 8,
                  },
                  name: "International",
                  value: "international",
                },
              ],
              color: "red",
              size: "One Size",
              cashback: {
                amount: 4,
                type: "cash",
              },
              discount: 10,
              description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
            },
            {
              location: {
                address: "address",
                city: "city",
                cords: {
                  lat: 15,
                  lng: 16,
                },
                country: "country",
                countryCode: "CH",
                postalCode: 13254,
                state: "state",
              },
              id: "2",
              thumbnail:
                "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
              name: "item1",
              price: 15,
              qty: 3,
              shippingMethods: [
                {
                  cost: 15,
                  description: "test",
                  id: "12",
                  deliveryTime: {
                    from: 5,
                    to: 7,
                  },
                  name: "European union",
                  value: "european_union",
                },
                {
                  cost: 0,
                  description: "test",
                  id: "12",
                  deliveryTime: {
                    from: 1,
                    to: 3,
                  },
                  name: "Click & Collect",
                  value: "click_and_collect",
                },
                {
                  cost: 20,
                  description: "test",
                  id: "12",
                  deliveryTime: {
                    from: 6,
                    to: 8,
                  },
                  name: "International",
                  value: "international",
                },
              ],
              color: "red",
              size: "One Size",
              cashback: {
                amount: 4,
                type: "cash",
              },
              discount: 10,
              description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
            },
            {
              location: {
                address: "address",
                city: "city",
                cords: {
                  lat: 15,
                  lng: 16,
                },
                country: "country",
                countryCode: "CH",
                postalCode: 13254,
                state: "state",
              },
              id: "2",
              thumbnail:
                "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
              name: "item1",
              price: 15,
              qty: 3,
              shippingMethods: [
                {
                  cost: 15,
                  description: "test",
                  id: "12",
                  deliveryTime: {
                    from: 5,
                    to: 7,
                  },
                  name: "European union",
                  value: "european_union",
                },
                {
                  cost: 0,
                  description: "test",
                  id: "12",
                  deliveryTime: {
                    from: 1,
                    to: 3,
                  },
                  name: "Click & Collect",
                  value: "click_and_collect",
                },
                {
                  cost: 20,
                  description: "test",
                  id: "12",
                  deliveryTime: {
                    from: 6,
                    to: 8,
                  },
                  name: "International",
                  value: "international",
                },
              ],
              color: "red",
              size: "One Size",
              cashback: {
                amount: 4,
                type: "cash",
              },
              discount: 10,
              description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
            },
          ],
          phoneNumber: "456-165-1345",
          deliveryCost: 16,
          discount: 10,
          tax: 30,
        },
        isLoading: false,
        isError: false,
      },
    };
  },
}));

describe("OrderDetails Modal tests", () => {
  let wrapper: ShallowWrapper;

  beforeAll(() => {});

  beforeEach(() => {
    wrapper = shallow(<OrderDetailsModal />);
    mockUseGetOrderDetailsQuery.mockClear();
  });
  it("should call useGetOrderDetailsQuery", () => {
    expect(mockUseGetOrderDetailsQuery).toBeCalled();
  });
});
