import { FinancialAccountType, WithdrawalStatus } from "@features/API";
import { useGetMyWithdrawalsQuery } from "ui";
import { shallow, ShallowWrapper } from "enzyme";
import { PayoutSection } from "./PayoutSection";
import React from "react";

jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useGetMyWithdrawalsQuery: jest.fn().mockImplementation(() => ({ data: [] })),
}));

describe("payout section tests", () => {
  let wrapper: ShallowWrapper;

  let mockUseGetWithdrawals = useGetMyWithdrawalsQuery as jest.Mock;

  let mockData: ReturnType<typeof useGetMyWithdrawalsQuery>["data"] = [
    {
      id: "1",
      amount: 15,
      financialAccount: {
        id: "1",
        label: "paypal",
        type: FinancialAccountType.Bank,
      },
      processedAt: new Date().toString(),
      requestedAt: new Date().toString(),
      status: WithdrawalStatus.Pending,
      userId: "1",
    },
  ];

  beforeEach(() => {
    mockUseGetWithdrawals.mockReturnValue({
      data: mockData,
    });

    wrapper = shallow(<PayoutSection />);
  });

  it("should display payout data", () => {
    expect(mockUseGetWithdrawals).toBeCalledTimes(1);
  });
});
