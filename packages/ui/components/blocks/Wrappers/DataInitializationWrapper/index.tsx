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
    id: "123",
    name: "Wiaah",
    firstName: "Wiaah",
    lastName: "Market",
    email: "WiaahMarket@dev.com",
    accountType: "seller",
    photoSrc: "/wiaah_logo.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}, []);

  return <>{children}</>;
};
