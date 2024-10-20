import { shallow, ShallowWrapper } from "enzyme";
import { MyReturnsSection } from ".";
import { useGetMyReturnedProductsQuery } from "@UI";
import React from "react";
import { getTestId } from "utils";
import { RefundStatusType, RefundType } from "@features/API";

jest.mock("@UI", () => ({
  ...jest.requireActual("@UI"),
  useGetMyReturnedProductsQuery: jest.fn(),
}));

const testIds = {
  thumbnail: "item-thumbnail",
  title: "item-title",
  price: "item-price",
  qty: "item-qty",
  reason: "item-reason",
  status: "item-status",
  item: "item",
};

describe("MyWishListSection", () => {
  let wrapper: ShallowWrapper;

  let mockGetItems = useGetMyReturnedProductsQuery as jest.Mock;

  const mockReturnedItems = [
    {
      id: "id 1",
      amount: 156,
      fullAmount: false,
      product: {
        id: "prodid 1",
        thumbnail: "prodthumb 1",
        title: "title 1",
      },
      productId: "prodid 1",
      qty: 5,
      reason: "test reason",
      requestedById: "buyer id 1",
      sellerId: "seller id 1",
      status: RefundStatusType.Pending,
      type: RefundType.Money,
    },
    {
      id: "id 2",
      amount: 165,
      fullAmount: true,
      product: {
        id: "prodid 2",
        thumbnail: "prodthumb 2",
        title: "title 2",
      },
      qty: 5,
      reason: "test reason 2",
      requestedById: "buyer id 2",
      sellerId: "seller id 2",
      status: RefundStatusType.Pending,
      type: RefundType.Money,
    },
  ] as ReturnType<typeof useGetMyReturnedProductsQuery>["data"];

  beforeAll(() => {
    mockGetItems.mockReturnValue({
      data: mockReturnedItems as ReturnType<
        typeof useGetMyReturnedProductsQuery
      >["data"],
      isLoading: false,
      isError: false,
    });

    wrapper = shallow(<MyReturnsSection />);
  });

  it("should display the right items", async () => {
    expect(useGetMyReturnedProductsQuery).toBeCalledTimes(1);

    const items = wrapper.find(getTestId(testIds.item));
    expect(items).toHaveLength(2);

    items.forEach((item, i) => {
      const data = mockReturnedItems![i];

      expect(item.find(getTestId(testIds.title)).dive().text()).toBe(
        data.product?.title,
      );
      expect(item.find(getTestId(testIds.thumbnail)).prop("src")).toBe(
        data.product?.thumbnail,
      );
      expect(item.find(getTestId(testIds.price)).prop("price")).toBe(
        data.amount,
      );

      expect(item.find(getTestId(testIds.qty)).dive().text()).toBe(
        data.qty.toString(),
      );
      expect(item.find(getTestId(testIds.reason)).dive().text()).toBe(
        data.reason,
      );
      expect(item.find(getTestId(testIds.status)).dive().text()).toBe(
        data.status,
      );
    });
  });
});
