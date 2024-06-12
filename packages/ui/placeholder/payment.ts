import { FinancialAccountType } from "@features/API";
import { GetMyFinAccountsQuery } from "ui";

export const FinancialAccountPlaceholder: GetMyFinAccountsQuery["getMyFinancialAccounts"] =
  [
    {
      financialId: "12345",
      label: "Primary Account",
      type: FinancialAccountType.Bank,
      id: "1",
      bank_country: "US",
      bank_number: "123456789",
      card_exp_month: "12",
      card_exp_year: "2025",
      cardLast4: "1234",
      currency: "USD",
      ownerId: "owner123",
    },

    {
      financialId: "12345",
      label: "Primary Account",
      type: FinancialAccountType.Bank,
      id: "1",
      bank_country: "US",
      bank_number: "123456789",
      card_exp_month: "12",
      card_exp_year: "2025",
      cardLast4: "1234",
      currency: "USD",
      ownerId: "owner123",
    },

    {
      financialId: "12345",
      label: "Primary Account",
      type: FinancialAccountType.Bank,
      id: "1",
      bank_country: "US",
      bank_number: "123456789",
      card_exp_month: "12",
      card_exp_year: "2025",
      cardLast4: "1234",
      currency: "USD",
      ownerId: "owner123",
    },
  ];
