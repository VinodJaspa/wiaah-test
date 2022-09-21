import {
  ProductCheckoutCard,
  ProductCheckoutCardProps,
} from "./ProductCheckoutCard";
import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";

const selectors = {
  moveToWishlistBtn: "MoveToWishlistBtn",
  deleteBtn: "DeleteBtn",
};

describe("ProductCheckoutCard functional testing", () => {
  let wrapper: ShallowWrapper;
  let MoveToWishlistMock: jest.Mock;
  let RemoveItemMock: jest.Mock;
  let props: ProductCheckoutCardProps;

  beforeEach(() => {
    MoveToWishlistMock = jest.fn();
    RemoveItemMock = jest.fn();
    props = {
      onItemDelete: RemoveItemMock,
      id: "13",
      color: "red",
      cashback: {
        amount: 500,
        type: "cash",
      },
      description: "description",
      discount: 30,
      location: {
        address: "address",
        city: "city",
        cords: {
          lat: 25,
          lng: 45,
        },
        country: "country",
        countryCode: "CH",
        postalCode: 135,
        state: "state",
      },
      name: "name",
      onMoveToWishlist: MoveToWishlistMock,
      price: 26,
      qty: 15,
      shippingMethods: [],
      size: "small",
      thumbnail: "/shop-2.jpeg",
    };
    wrapper = shallow(<ProductCheckoutCard {...props} />);
  });

  test("onMoveToWishlist to be triggered on click on wishlist button", () => {
    wrapper.find(getTestId(selectors.moveToWishlistBtn)).simulate("click");
    expect(MoveToWishlistMock).toBeCalledTimes(1);
    expect(MoveToWishlistMock).toBeCalledWith(props.id);
  });
  test("onItemDelete should be triggered on remove btn click", () => {
    wrapper.find(getTestId(selectors.deleteBtn)).simulate("click");
    expect(RemoveItemMock).toBeCalledTimes(1);
    expect(RemoveItemMock).toBeCalledWith(props.id);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
