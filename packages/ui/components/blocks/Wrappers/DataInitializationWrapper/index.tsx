import React from "react";
import { useUserData } from "hooks";
import { AccountType } from "types";
export interface DataInitializationWrapper {
  accountType: AccountType;
  children: React.ReactNode;
}

export const DataInitializationWrapper: React.FC<DataInitializationWrapper> = ({
  children,
}) => {
  const { initUserData } = useUserData();
  React.useEffect(() => {
    initUserData({
      name: "Wiaah",
      email: "WiaahMarket@dev.com",
      accountType: "seller",
      photoSrc: "/wiaah_logo.png",
      id: "123",
    });
  }, []);
  return <>{children}</>;
};
