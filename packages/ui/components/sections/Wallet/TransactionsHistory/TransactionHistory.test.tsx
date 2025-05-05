import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { TransactionsHistorySection } from ".";
import {
  useGetMyBalanceQuery,
  useGetMyFinancialAccountsQuery,
  useGetMyTransactionHistoryQuery,
  useGetWithdrawCurrneicesQuery,
  useUserData,
} from "@UI";
import { getTestId } from "utils";
import { TransactionStatus } from "@features/API";

jest.mock("@UI", () => ({
  ...jest.requireActual("@UI"),
  useGetMyBalanceQuery: jest.fn(),
  useGetMyTransactionHistoryQuery: jest.fn(),
  useUserData: jest.fn(),
  useGetWithdrawCurrneicesQuery: jest.fn(),
  useGetMyFinancialAccountsQuery: jest.fn(),
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

const mockData = {
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
      toUser: {
        id: "test to id",
      },
      updatedAt: new Date().toString(),
      userId: "user id 1",
    },
  ],
} as Partial<ReturnType<typeof useGetMyTransactionHistoryQuery>>;

const mockBalanceData = {
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

const mockUseUserData = {
  user: {
    accountType: "buyer",
    email: "test",
    id: "test",
    name: "test",
    photoSrc: "test",
  },
} as ReturnType<typeof useUserData>;

const mockGetWithdrawCurrenciesData = {
  data: [
    {
      code: "usd",
      currency: {
        code: "usd",
        exchangeRate: 15,
        id: "test",
        name: "USD",
        symbol: "$",
      },
    },
    {
      code: "eur",
      currency: {
        code: "eur",
        exchangeRate: 10,
        id: "test12",
        name: "EUR",
        symbol: "%",
      },
    },
  ],
} as ReturnType<typeof useGetWithdrawCurrneicesQuery>;

const mockGetMyFinancialAccountsData = {
  data: [
    {
      id: "tst",
      financialId: "test",
      label: "Stripe",
      type: "stripe",
    },
  ],
} as ReturnType<typeof useGetMyFinancialAccountsQuery>;

describe("addressBookSection tests", () => {
  let wrapper: ShallowWrapper;

  const mockGetQuery = useGetMyTransactionHistoryQuery as jest.Mock;
  const mockGetBalance = useGetMyBalanceQuery as jest.Mock;
  const mockUseUser = useUserData as jest.Mock;
  const mockGetwithdrawCurrencies = useGetWithdrawCurrneicesQuery as jest.Mock;
  const mockGetFinancialAccounts = useGetMyFinancialAccountsQuery as jest.Mock;

  beforeAll(() => {
    mockGetQuery.mockReturnValue(mockData);
    mockGetBalance.mockReturnValue(mockBalanceData);
    mockUseUser.mockReturnValue(mockUseUserData);
    mockGetwithdrawCurrencies.mockReturnValue(mockGetWithdrawCurrenciesData);
    mockGetFinancialAccounts.mockReturnValue(mockGetMyFinancialAccountsData);

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
