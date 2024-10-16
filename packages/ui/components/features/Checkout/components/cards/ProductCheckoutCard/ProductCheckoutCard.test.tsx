import {
  ProductCheckoutCard,
  ProductCheckoutCardProps,
} from "./ProductCheckoutCard";
import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";
import { ProductType } from "@features/API";

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
      id: "1",
      shopName: "Sample Shop",
      shopVerified: true,
      title: "Sample Product",
      size: "M",
      color: "Red",
      thumbnail: "https://via.placeholder.com/150",
      qty: 1,
      price: 29.99,
      total: 29.99,
      shippingMethods: [
        {
          name: "Standard Shipping",
          price: 5.99,
          deliveryRange: [3, 5],
        },
        {
          name: "Express Shipping",
          price: 9.99,
          deliveryRange: [1, 2],
        },
      ],
      type: ProductType.Goods, // Adjust according to your ProductType definition
      format: "New",
      onItemDelete: (id) => console.log(`Item deleted: ${id}`),
      onMoveToWishlist: (id) => console.log(`Moved to wishlist: ${id}`),
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
