import React from "react";
import { Tabs } from "antd";
import { useRouter } from "next/router";
import { t } from "i18next";
import { LoginType } from "../../../../apps/market/lib/LoignTypes";
import { LoginView } from "./LoginView";
import { BuyerSignupView } from "./BuyerSignupView";
import { SellerSignupView } from "./SellerSignupView";

const { TabPane } = Tabs;
export interface LoginViewProps {
  loginType: LoginType;
}

export const Login: React.FC<LoginViewProps> = ({ loginType = "login" }) => {
  const router = useRouter();

  function handleActivateTabChange(activeKey: string) {
    if (activeKey == "1") {
      router.push("/login");
    } else if (activeKey == "2") {
      router.push("/buyer-signup");
    }
  }

  const RenderLogin = () => {
    switch (loginType) {
      case "login":
        return (
          <Tabs
            activeKey={loginType == "login" ? "1" : "2"}
            onChange={handleActivateTabChange}
            centered
          >
            <TabPane
              className="login-form"
              tab={
                <span className="px-5 text-xl font-light text-gray-800">
                  {t("Login!", "Login!")}
                </span>
              }
              key="1"
            >
              <LoginView />
            </TabPane>
          </Tabs>
        );
      case "buyer-signup":
        return (
          <Tabs
            activeKey={loginType == "buyer-signup" ? "1" : "2"}
            onChange={handleActivateTabChange}
            centered
          >
            <TabPane
              className="login-form"
              tab={
                <span className="px-5 text-xl font-light capitalize text-gray-800">
                  {t("buyer_signup", "Buyer Signup")}
                </span>
              }
              key="1"
            >
              <BuyerSignupView />
            </TabPane>
          </Tabs>
        );
      case "seller-signup":
        return <SellerSignupView />;
    }
  };
  return (
    <>
      <div
        className={`login-view-container xl:py-34
       flex flex-col items-start bg-[#00B081] p-4 lg:flex-row lg:p-24 xl:px-36`}
      >
        <div className="container mx-auto flex flex-col rounded-lg bg-black bg-opacity-20 filter lg:flex-row">
          <div className="w-full p-2 text-white lg:w-7/12">
            <h1 className="text-3xl text-white lg:text-5xl">
              {t(
                "Welcome_to_Wiaah",
                "Welcome to Wiaah: The First and Reference Social Marketplace"
              )}
            </h1>
            <p className="mt-5 mb-5 text-justify text-base font-light lg:mt-10 lg:text-xl">
              {t(
                "With_Wiaah_Text",
                "With Wiaah, connect with the world's leading fashion brands and your favourite brands, participate in their success while succeding in your turn."
              )}
            </p>
            <div className="flex flex-col items-end text-lg font-light lg:text-xl">
              <cite className="text-justify">
                {t(
                  "founder_of_wiaah_cite",
                  '"It is by participating in the success of others that we acheive our own success"'
                )}
              </cite>
              <div className="mt-5 mb-5 lg:mb-0">
                {t("Founder_of_Wiaah", "Founder of Wiaah")}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end lg:w-6/12">
            <div className="w-full rounded-lg bg-white px-8 pt-4 pb-6 shadow-xl lg:w-10/12">
              {RenderLogin()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
