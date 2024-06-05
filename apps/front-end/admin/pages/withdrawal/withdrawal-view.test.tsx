import { AccountType, WithdrawalStatus } from "@features/API";
import {
  useAdminAcceptWithdrawalRequestMutation,
  useAdminGetWithdrawalsQuery,
} from "@UI";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { getTestId } from "utils";
import WithdrawalView from "./index";

jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useAdminAcceptWithdrawalRequestMutation: jest.fn(),
  useAdminGetWithdrawalsQuery: jest.fn(),
}));

const testids = {
  table: "withdrawal-table",
  acceptBtn: "withdrawal-accept-btn",
};

describe("admin withdrawal tests", () => {
  let wrapper: ShallowWrapper;

  let mockUseAdminAcceptWithdrawalRequestMutation =
    useAdminAcceptWithdrawalRequestMutation as jest.Mock;
  let mockUseAdminGetWithdrawalQuery = useAdminGetWithdrawalsQuery as jest.Mock;

  let mockAcceptMutate = jest.fn();

  let mockData: ReturnType<typeof useAdminGetWithdrawalsQuery>["data"] = [
    {
      id: "1",
      amount: 158,
      processedAt: new Date().toString(),
      requestedAt: new Date().toString(),
      status: WithdrawalStatus.Pending,
      user: {
        accountType: AccountType.Seller,
        email: "email 1",
        shop: {
          name: "shop 1",
        },
        profile: {
          username: "user 1",
        },
      },
      userId: "user id 1",
    },
    {
      id: "2",
      amount: 500,
      processedAt: new Date().toString(),
      requestedAt: new Date().toString(),
      status: WithdrawalStatus.Processed,
      user: {
        accountType: AccountType.Seller,
        email: "email 2",
        shop: {
          name: "shop 2",
        },
        profile: {
          username: "user 2",
        },
      },
      userId: "user id 2",
    },
  ];

  beforeEach(() => {
    mockUseAdminAcceptWithdrawalRequestMutation.mockReturnValue({
      mutate: mockAcceptMutate,
    });

    mockUseAdminGetWithdrawalQuery.mockReturnValue({ data: mockData });

    wrapper = shallow(<WithdrawalView />);
  });

  it("should display withdrawals", () => {
    expect(mockUseAdminAcceptWithdrawalRequestMutation).toBeCalledTimes(1);
    expect(mockUseAdminGetWithdrawalQuery).toBeCalledTimes(1);

    const table = wrapper.find(getTestId(testids.table));

    const tableData = table.prop("data") as unknown as Array<any>;

    expect(tableData.length).toBe(mockData.length);

    tableData.forEach((e, idx) => {
      expect(e.id).toBe(mockData[idx].id);
      const cols = e.cols as Array<any>;
      expect(cols.at(-1).actionBtns).toHaveLength(
        mockData[idx].status === WithdrawalStatus.Pending ? 1 : 0
      );
      const actionbtn = cols.at(-1).actionBtns[0] as ShallowWrapper;
      console.log("bt", actionbtn);
      if (actionbtn && typeof actionbtn["props"]["onClick"] === "function") {
        // @ts-ignore
        actionbtn.props.onClick();
      }
    });

    expect(mockAcceptMutate).toBeCalledTimes(1);
  });
});
