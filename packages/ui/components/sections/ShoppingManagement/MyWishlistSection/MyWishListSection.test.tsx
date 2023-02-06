import { shallow, ShallowWrapper } from "enzyme";
import { MyWishListSection } from ".";
import { useGetMyWishlistQuery, useRemoveItemFromWishlistMutation } from "@UI";
import React from "react";
import { getTestId } from "@UI/../utils/src";

jest.mock("@UI", () => ({
  ...jest.requireActual("@UI"),
  useGetMyWishlistQuery: jest.fn(),
  useRemoveItemFromWishlistMutation: jest.fn(),
}));

const testIds = {
  thumbnail: "item-thumbnail",
  title: "item-title",
  price: "item-price",
  stock: "item-stock",
  deleteBtn: "item-delete-btn",
  addToCardBtn: "item-add-to-cart-btn",
  item: "item",
};

describe("MyWishListSection", () => {
  let wrapper: ShallowWrapper;

  let mockGetWishlist = useGetMyWishlistQuery as jest.Mock;
  let mockRemoveWishlist = useRemoveItemFromWishlistMutation as jest.Mock;
  let mockMutateRemove = jest.fn();

  const mockWishlistItems = [
    {
      itemId: "testitem1",
      itemType: "product",
      product: {
        price: 15,
        stock: 156,
        thumbnail: "test thum 1",
        title: "test prod 1",
      },
      __typename: "WishlistItem",
    },
    {
      itemId: "testitem2",
      itemType: "service",
      service: {
        price: 16,
        stock: 150,
        thumbnail: "test thum 2",
        title: "test prod 2",
      },
      __typename: "WishlistItem",
    },
  ];

  beforeAll(() => {
    mockGetWishlist.mockReturnValue({
      data: {
        id: "testid",
        ownerId: "testownerid",
        __typename: "Wishlist",
        wishedItems: mockWishlistItems,
      } as ReturnType<typeof useGetMyWishlistQuery>["data"],
      isLoading: false,
      isError: false,
    });

    mockRemoveWishlist.mockReturnValue({
      mutate: mockMutateRemove,
      isLoading: false,
      isError: false,
    });

    wrapper = shallow(<MyWishListSection />);
  });

  it("should display the right wishedItems", async () => {
    expect(useGetMyWishlistQuery).toBeCalledTimes(1);

    const items = wrapper.find(getTestId(testIds.item));
    expect(items).toHaveLength(2);

    items.forEach((item, i) => {
      const data = mockWishlistItems[i];

      expect(item.find(getTestId(testIds.title)).dive().text()).toBe(
        data.itemType === "product" ? data.product?.title : data.service?.title
      );
      expect(item.find(getTestId(testIds.thumbnail)).prop("src")).toBe(
        data.itemType === "product"
          ? data.product?.thumbnail
          : data.service?.thumbnail
      );
      expect(item.find(getTestId(testIds.price)).prop("price")).toBe(
        data.itemType === "product" ? data.product?.price : data.service?.price
      );
      expect(item.find(getTestId(testIds.stock)).dive().text()).toBe(
        data.itemType === "product" ? `${data.product?.stock}` : "Avaiable"
      );
    });
  });

  it("should call the remove item from wishlist hook with the right id", async () => {
    expect(useGetMyWishlistQuery).toBeCalledTimes(1);

    const items = wrapper.find(getTestId(testIds.item));
    expect(items).toHaveLength(2);

    await Promise.all(
      items.map(async (item, i) => {
        const data = mockWishlistItems[i];

        const deleteBtn = item
          .find(getTestId(testIds.deleteBtn))
          .simulate("click");

        expect(mockMutateRemove).toBeCalledTimes(1);
        expect(mockMutateRemove).toHaveBeenCalledWith({ itemId: data.itemId });
        mockMutateRemove.mockClear();
      })
    );
  });
});
