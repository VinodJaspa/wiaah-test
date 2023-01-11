import React, { FC } from "react";
import { LoginType } from "types";
import { Tabs } from "antd";
import { useRouter } from "next/router";
import {
  LoginView,
  BuyerSignupView,
  SellerSignupView,
  FormikInput,
  Button,
} from "@UI";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { BiKey } from "react-icons/bi";
export interface AuthSwitcherProps {
  loginType: LoginType;
  onViewChange?: (view: LoginType) => void;
  link?: boolean;
  onSubmit?: (data: any, type: LoginType) => any;
}

const { TabPane } = Tabs;
export const AuthSwitcher: FC<AuthSwitcherProps> = ({
  loginType,
  onViewChange,
  link,
  onSubmit,
}) => {
  const { t } = useTranslation();
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
            <LoginView
              onSubmit={(data) => {
                onSubmit && onSubmit(data, "login");
              }}
              setAuthView={(view) => handleChangeView(view)}
            />
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
            <BuyerSignupView
              onSubmit={(data) => onSubmit && onSubmit(data, "buyer-signup")}
            />
          </TabPane>
        </Tabs>
      );
    case "seller-signup":
      return (
        <SellerSignupView
          onSubmit={(data) => onSubmit && onSubmit(data, "seller-signup")}
        />
      );
    case "email-verify":
      return (
        <div className="flex flex-col gap-4" id="SellerSignupView">
          <h2 className="text-3xl capitalize">{t("Verify Your Email")}</h2>
          <Formik
            initialValues={{}}
            onSubmit={(data) => {
              onSubmit && onSubmit(data, "email-verify");
            }}
          >
            {() => {
              return (
                <Form className="flex justify-center flex-col gap-4">
                  <FormikInput
                    name="code"
                    placeholder={t("eg. 123456")}
                    type="text"
                    icon={<BiKey className="mr-2 text-xl text-gray-400" />}
                  />

                  <Button className="mt-5 h-12 w-full rounded-sm  px-8 py-2 text-lg uppercase text-white">
                    {t("sign_up", "sign up")}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      );
  }
};
