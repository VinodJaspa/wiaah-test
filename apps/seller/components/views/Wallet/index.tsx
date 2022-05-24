import { useRouter } from "next/router";
import React from "react";
import { SettingsSectionType } from "types";
import {
  WithdrawalSection,
  SectionsLayout,
  TransactionsHistorySection,
  VouchersSection,
} from "ui";
import { FaMoneyBill, FaPercent } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";

export const WalletView: React.FC = () => {
  const baseRoute = "wallet";
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section[0] : section;

  React.useEffect(() => {
    if (!route) router.push(`/${baseRoute}/${sections[0].panelUrl}`);
  }, [router, route]);

  return (
    <SectionsLayout
      currentSectionName={route}
      name={{
        translationKey: "wallet",
        fallbackText: "Wallet",
      }}
      sections={sections}
      handleSectionChange={(url) => router.replace(`/${baseRoute}/${url}`)}
    />
  );
  // return <>"wallet"</>;
};

const sections: SettingsSectionType[] = [
  {
    panelName: {
      translationKey: "withdrawal",
      fallbackText: "Withdrawal",
    },
    panelIcon: FaMoneyBill,
    panelUrl: "/withdrwal",
    panelComponent: <WithdrawalSection />,
  },
  {
    panelName: {
      translationKey: "transactions",
      fallbackText: "Transactions",
    },
    panelIcon: AiOutlineTransaction,
    panelUrl: "/transactions",
    panelComponent: <TransactionsHistorySection />,
  },
  {
    panelName: {
      translationKey: "vouchers",
      fallbackText: "Vouchers",
    },
    panelIcon: FaPercent,
    panelUrl: "/vouchers",
    panelComponent: <VouchersSection />,
  },
];
