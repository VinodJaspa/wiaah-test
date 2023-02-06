import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { TransactionsHistorySection } from ".";
import {
  useGetMyBalanceQuery,
  useGetMyTransactionHistoryQuery,
  useUserData,
} from "@UI";
import { getTestId } from "utils";
import { TransactionStatus } from "@features/API";

jest.mock("@UI", () => ({
  ...jest.requireActual("@UI"),
  useGetMyBalanceQuery: jest.fn(),
  useGetMyTransactionHistoryQuery: jest.fn(),
  useUserData: jest.fn(),
}));

const testids = {
  item: "item",
  status: "item-status",
  Id: "item-id",
  type: "item-type",
  recipent: "item-recipient",
  amount: "item-amount",
  currency: "item-currency",
};

let mockData = {
  isLoading: false,
  data: [
    {
      amount: 136,
      createdAt: new Date().toString(),
      currency: "USD",
      description: "test desc",
      from: "test id",
      fromUser: {
        id: "test",
        profile: {
          id: "prof 1",
          username: "prof user",
        },
      },
      id: "id 1",
      status: TransactionStatus.Success,
      toUser: "to id 1",
      updatedAt: new Date().toString(),
      userId: "user id 1",
    },
  ],
} as ReturnType<typeof useGetMyTransactionHistoryQuery>;

let mockBalanceData = {
  isLoading: false,
  data: {
    allTimeEarnings: 156,
    balanceCurrency: "USD",
    cashbackBalance: 15,
    convertedCashbackBalance: 65,
    pendingBalance: 15,
    withdrawableBalance: 16,
  },
} as ReturnType<typeof useGetMyBalanceQuery>;

let mockUseUserData = {
  user: {
    accountType: "buyer",
    email: "test",
    id: "test",
    name: "test",
    photoSrc: "test",
  },
} as ReturnType<typeof useUserData>;

describe("addressBookSection tests", () => {
  let wrapper: ShallowWrapper;

  let mockGetQuery = useGetMyTransactionHistoryQuery as jest.Mock;
  let mockGetBalance = useGetMyBalanceQuery as jest.Mock;
  let mockUseUser = useUserData as jest.Mock;

  beforeAll(() => {
    mockGetQuery.mockReturnValue(mockData);
    mockGetBalance.mockReturnValue(mockBalanceData);
    mockUseUser.mockReturnValue(mockUseUserData);

    wrapper = shallow(<TransactionsHistorySection />);
  });

  it("should display the right data", async () => {
    const cards = wrapper.find(getTestId(testids.item));

    await Promise.all(
      cards.map(async (card, i) => {
        const data = mockData.data![i];

        expect(card.find(testids.amount).text()).toBe(`${data.amount}`);
        expect(card.find(testids.currency).text()).toBe(`${data.currency}`);
        expect(card.find(testids.Id).text()).toBe(`${data.id}`);
        expect(card.find(testids.type).text()).toBe(`${data.description}`);
        expect(card.find(testids.status).prop("status")).toBe(data.status);
      })
    );
  });
});
