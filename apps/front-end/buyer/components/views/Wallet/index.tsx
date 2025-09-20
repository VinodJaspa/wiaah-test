import { useRouter } from "next/router";
import React from "react";
import { SettingsSectionType } from "types";
import {
  PayoutSection,
  SectionsLayout,
} from "ui";
import { FaPercent } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiPayMoney } from "react-icons/gi";
import TransactionSection from "@sections/Wallet/TransactionsHistory";
import VouchersSectionMain from "@sections/ShoppingManagement/Vouchers/VouchersSection";

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
};

const sections: SettingsSectionType[] = [
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
  {
    panelName: "payout",
    panelIcon: GiPayMoney,
    panelUrl: "/payout",
    panelComponent: <PayoutSection />,
  },
];
