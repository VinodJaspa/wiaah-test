import { shallow, ShallowWrapper } from "enzyme";
import AdminVoucherView from "./index";
import React from "react";
import { useAdminGetVouchersQuery } from "ui";
import { VoucherStatus } from "@features/API";
import { getTestId } from "utils";

jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useAdminGetVouchersQuery: jest.fn(),
}));

const testids = {
  voucherRecord: "voucher-record",
  voucherCode: "voucher-code",
  voucherName: "voucher-name",
  voucherPrice: "voucher-price",
  voucherStatus: "voucher-status",
  voucherDate: "voucher-date",
  voucherCurrency: "voucher-currency",
};

describe("VouchersView tests", () => {
  let wrapper: ShallowWrapper;
  let mockUseAdminGetVouchersQuery = useAdminGetVouchersQuery as jest.Mock;

  let mockVoucherData: ReturnType<typeof useAdminGetVouchersQuery>["data"] = [
    {
      id: "id1",
      amount: 15,
      code: "test145",
      createdAt: new Date().toString(),
      currency: "usd",
      status: VoucherStatus.Active,
      user: {
        firstName: "name-1",
        id: "testid2",
      },
    },
    {
      id: "id2",
      amount: 321,
      code: "teas154",
      createdAt: new Date().toString(),
      currency: "eur",
      status: VoucherStatus.InActive,
      user: {
        firstName: "name-2",
        id: "testid3",
      },
    },
  ];

  beforeEach(() => {
    mockUseAdminGetVouchersQuery.mockReset();
    mockUseAdminGetVouchersQuery.mockReturnValue({
      data: mockVoucherData,
    } as ReturnType<typeof useAdminGetVouchersQuery>);
    wrapper = shallow(<AdminVoucherView />);
  });

  it("it should call the hooks", () => {
    expect(mockUseAdminGetVouchersQuery).toBeCalledTimes(1);
  });

  it("should display the vouchers", () => {
    const records = wrapper.find(getTestId(testids.voucherRecord));
    expect(records).toHaveLength(2);

    records.forEach((e, i) => {
      expect(e.find(getTestId(testids.voucherCode)).children().text()).toBe(
        mockVoucherData[i].code
      );
      expect(e.find(getTestId(testids.voucherCurrency)).children().text()).toBe(
        mockVoucherData[i].currency
      );
      expect(e.find(getTestId(testids.voucherName)).children().text()).toBe(
        mockVoucherData[i].user.firstName
      );
      expect(e.find(getTestId(testids.voucherPrice)).children().text()).toBe(
        `${mockVoucherData[i].amount}`
      );
      expect(e.find(getTestId(testids.voucherStatus)).children().text()).toBe(
        mockVoucherData[i].status
      );
      expect(e.find(getTestId(testids.voucherDate)).children().text()).toBe(
        new Date(mockVoucherData[i].createdAt).toDateString()
      );
    });
  });
});
