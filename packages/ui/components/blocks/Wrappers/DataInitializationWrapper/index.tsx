import React from "react";
import { useUserData, useAccountType } from "hooks";
import { AccountType } from "types";
export interface DataInitializationWrapper {
  accountType: AccountType;
}

export const DataInitializationWrapper: React.FC<DataInitializationWrapper> = ({
  children,
  accountType = "seller",
}) => {
  const { initUserData } = useUserData();
  const { setAccountType } = useAccountType();
  React.useEffect(() => {
    initUserData({
      name: "Wiaah",
      email: "WiaahMarket@dev.com",
      accountType: "seller",
      photoSrc: "/wiaah_logo.png",
      id: "123",
    });
    setAccountType(accountType);
  }, []);
  return <>{children}</>;
};
