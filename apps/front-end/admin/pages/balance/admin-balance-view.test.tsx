import { TransactionStatus } from "@features/API";
import { useAdminGetFilteredTransactionsQuery } from "@UI";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { getTestId } from "utils";
import AdminBalanceView from "./index";

jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useAdminGetFilteredTransactionsQuery: jest.fn(),
}));

const testids = {
  table: "transaction-table",
};

describe("admin balance view tests", () => {
  let wrapper: ShallowWrapper;

  let mockData: ReturnType<
    typeof useAdminGetFilteredTransactionsQuery
  >["data"] = [
    {
      amount: 15,
      createdAt: new Date().toString(),
      description: "test desc 1",
      id: "1",
      status: TransactionStatus.Pending,
      toUser: {
        profile: {
          username: "test user 1",
        },
        subscribedPlan: {
          membership: {
            name: "test plan 1",
          },
        },
      },
    },
    {
      amount: 20,
      createdAt: new Date().toString(),
      description: "test desc 2",
      id: "2",
      status: TransactionStatus.Success,
      toUser: {
        profile: {
          username: "test user 2",
        },
        subscribedPlan: {
          membership: {
            name: "test plan 2",
          },
        },
      },
    },
  ];

  let mockUseAdminGetFilteredTransationsQuery =
    useAdminGetFilteredTransactionsQuery as jest.Mock;

  beforeEach(() => {
    mockUseAdminGetFilteredTransationsQuery.mockReturnValue({
      data: mockData,
    });
    wrapper = shallow(<AdminBalanceView />);
  });

  it("should display transactions", () => {
    expect(mockUseAdminGetFilteredTransationsQuery).toBeCalledTimes(1);

    const records = wrapper.find(getTestId(testids.table));

    expect(records.prop("data").length).toBe(2);
  });
});
