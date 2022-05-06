import React from "react";
import { useUserData } from "ui";

export const DataInitializationWrapper: React.FC = ({ children }) => {
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
