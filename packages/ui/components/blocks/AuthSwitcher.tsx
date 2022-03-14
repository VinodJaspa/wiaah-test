import React, { FC } from "react";
import { LoginType } from "../../../../apps/market/lib/LoignTypes";
import { Tabs } from "antd";
import { useRouter } from "next/router";
import { t } from "i18next";
import { LoginView } from "../../views/market/LoginView";
import { BuyerSignupView } from "../../views/market/BuyerSignupView";
import { SellerSignupView } from "../../views/market/SellerSignupView";
export interface AuthSwitcherProps {
  loginType: LoginType;
  onViewChange?: (view: LoginType) => void;
  link?: boolean;
}

const { TabPane } = Tabs;
export const AuthSwitcher: FC<AuthSwitcherProps> = ({
  loginType,
  onViewChange,
  link,
}) => {
  const [view, setView] = React.useState<LoginType>(loginType);
  const router = useRouter();

  const handleChangeView = (view: LoginType) => {
    if (onViewChange) {
      onViewChange(view);
    }
    if (link) {
      // it will redirect dont change view state
    } else {
      // it wont redirect change view state
      setView(view);
    }
  };

  function handleActivateTabChange(activeKey: string) {
    if (activeKey == "1") {
      router.push("/login");
    } else if (activeKey == "2") {
      router.push("/buyer-signup");
    }
  }

  switch (view) {
    case "login":
      return (
        <Tabs onChange={handleActivateTabChange} centered>
          <TabPane
            className="login-form"
            tab={
              <span className="px-5 text-xl font-light text-gray-800">
                {t("Login!", "Login!")}
              </span>
            }
          >
            <LoginView setAuthView={(view) => handleChangeView(view)} />
          </TabPane>
        </Tabs>
      );
    case "buyer-signup":
      return (
        <Tabs onChange={handleActivateTabChange} centered>
          <TabPane
            className="login-form"
            tab={
              <span className="px-5 text-xl font-light capitalize text-gray-800">
                {t("buyer_signup", "Buyer Signup")}
              </span>
            }
          >
            <BuyerSignupView />
          </TabPane>
        </Tabs>
      );
    case "seller-signup":
      return <SellerSignupView />;
  }
};
