import { useRouter } from "next/router";
import React from "react";
import { SettingsSectionType } from "types";
import {
  WithdrawalSection,
  SectionsLayout,
  
} from "ui";
import { FaMoneyBill, FaPercent } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import VouchersSectionMain from "@sections/ShoppingManagement/Vouchers/VouchersSection";
import TransactionSection from "@sections/Wallet/TransactionsHistory";

export const WalletView: React.FC = () => {
  const baseRoute = "wallet";
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section[0] : section;

  return (
    <SectionsLayout
      currentSectionName={route}
      name={{
        translationKey: "wallet",
        fallbackText: "Wallet",
      }}
      handleRetrun={() => {
        router.replace(`/${baseRoute}`);
      }}
      sections={sections}
      handleSectionChange={(url) => router.replace(`/${baseRoute}/${url}`)}
    />
  );
  // return <>"wallet"</>;
};

const sections: SettingsSectionType[] = [
  {
    panelName: "Withdrawal",
    panelIcon: FaMoneyBill,
    panelUrl: "/withdrwal",
    panelComponent: <WithdrawalSection />,
  },
  {
    panelName: "Transactions",
    panelIcon: AiOutlineTransaction,
    panelUrl: "/transactions",
    panelComponent: <TransactionSection />,
  },
  {
    panelName: "Vouchers",
    panelIcon: FaPercent,
    panelUrl: "/vouchers",
    panelComponent: <VouchersSectionMain />,
  },
];
