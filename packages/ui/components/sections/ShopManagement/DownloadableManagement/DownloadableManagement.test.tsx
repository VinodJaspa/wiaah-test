import { shallow, ShallowWrapper } from "enzyme";
import { DownloadableManagement } from "./DownloadableManagement";
import {
  Badge,
  Button,
  DownloadIcon,
  getTestId,
  PriceDisplay,
  useGetMyProducts,
} from "@UI";
import { AdminTableCellTypeEnum } from "@blocks";
import React from "react";
import { CashbackType, ProductStatus, VisibilityEnum } from "@features/API";

jest.mock("@UI", () => ({
  ...jest.requireActual("@UI"),
  useGetMyProducts: jest.fn(),
}));

const testids = {
  table: "table",
};

describe("downloadable management tests", () => {
  let wrapper: ShallowWrapper;

  let mockGetMyProducts = useGetMyProducts as jest.Mock;

  const mockMyProducts = {
    data: [
      {
        attributes: [],
        brand: "",
        cashback: {
          amount: 0,
          type: CashbackType.Cash,
          units: 1,
        },
        categoryId: "",
        description: "",
        discount: { amount: 0, units: 0 },
        earnings: 0,
        id: "",
        presentations: [],
        price: 0,
        rate: 0,
        reviews: 0,
        sales: 0,
        seller: {
          profile: {
            username: "test seller",
          },
        },
        sellerId: "test",
        shippingRulesIds: ["test"],
        shopId: "",
        status: ProductStatus.Active,
        stock: 0,
        thumbnail: "test",
        title: "test",
        vat: 0,
        vendor_external_link: "",
        visibility: VisibilityEnum.Public,
      },
    ],
  } as Partial<ReturnType<typeof useGetMyProducts>>;

  beforeAll(() => {
    mockGetMyProducts.mockReturnValue(mockMyProducts);
    wrapper = shallow(<DownloadableManagement />);
  });

  it("should display admin list table with the right data", async () => {
    const table = wrapper.find(getTestId(testids.table));
    expect(table).toBeDefined();
    expect(mockGetMyProducts).toBeCalledTimes(1);

    expect(table.prop("headers")).toEqual([
      {
        type: AdminTableCellTypeEnum.checkbox,
      },
      {
        type: AdminTableCellTypeEnum.text,
        value: "Photo",
      },
      {
        type: AdminTableCellTypeEnum.text,
        value: "Order Id",
      },
      {
        type: AdminTableCellTypeEnum.text,
        value: "Download Name",
      },
      {
        type: AdminTableCellTypeEnum.text,
        value: "Seller",
      },
      {
        type: AdminTableCellTypeEnum.text,
        value: "Status",
      },
      {
        type: AdminTableCellTypeEnum.text,
        value: "Total",
      },
      {
        type: AdminTableCellTypeEnum.action,
        value: "Action",
      },
    ]);

    expect(table.prop("data")).toEqual(
      mockMyProducts?.data?.map((v) => ({
        id: v.id,
        cols: [
          {
            type: AdminTableCellTypeEnum.checkbox,
            value: v.id,
          },
          {
            type: AdminTableCellTypeEnum.avatar,
            value: v.thumbnail,
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: v.id,
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: v.title,
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: v.seller.profile?.username,
          },
          {
            type: AdminTableCellTypeEnum.custom,
            custom: (
              <Badge
                cases={{
                  fail: [ProductStatus.Deleted, ProductStatus.Suspended],
                  off: ProductStatus.Pending,
                  warning: ProductStatus.Pasued,
                }}
                value={v.status}
              >
                {v.status}
              </Badge>
            ),
          },
          {
            type: AdminTableCellTypeEnum.custom,
            custom: <PriceDisplay price={v.price} />,
          },
          {
            type: AdminTableCellTypeEnum.action,
            actionBtns: [
              <Button center>
                <DownloadIcon />
              </Button>,
            ],
          },
        ],
      }))
    );
  });
});
