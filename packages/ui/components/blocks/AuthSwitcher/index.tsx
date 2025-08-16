import React, { FC } from "react";
import { LoginType } from "types";
import * as Tabs from "@radix-ui/react-tabs";
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
    if (!link) {
      // it wont redirect change view state
      setView(view);
    }
  };

  function handleActivateTabChange(activeKey: string) {
    if (activeKey === "login") {
      router.push("/login");
    } else if (activeKey === "buyer-signup") {
      router.push("/buyer-signup");
    } else if (activeKey === "seller-signup") {
      router.push("/seller-signup");
    }
  }

  switch (view) {
    case "login":
      return (
        <Tabs.Root
          value="login"
          onValueChange={handleActivateTabChange}
          className="w-full max-w-md mx-auto"
        >
          <Tabs.List className="flex justify-center border-b border-gray-200 mb-4">
            <Tabs.Trigger
              value="login"
              className="px-5 py-2 text-xl font-light text-black border-b-2 border-black"
            >
              {t("Login!", "Login!")}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="login">
            <LoginView
              onSubmit={(data) => onSubmit?.(data, "login")}
              setAuthView={handleChangeView}
            />
          </Tabs.Content>
        </Tabs.Root>
      );

    case "buyer-signup":
      return (
        <Tabs.Root
          value="buyer-signup"
          onValueChange={handleActivateTabChange}
          className="w-full max-w-md mx-auto"
        >
          <Tabs.List className="flex justify-center border-b border-gray-200 mb-4">
            <Tabs.Trigger
              value="buyer-signup"
              className="px-5 py-2 text-xl font-light text-black border-b-2 border-black"
            >
              {t("buyer_signup", "Buyer Signup")}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="buyer-signup">
            <BuyerSignupView />
          </Tabs.Content>
        </Tabs.Root>
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
            if(onSubmit){
              onSubmit(data, "email-verify");
            } 
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
                    {t("verify_email", "Verify Email")}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      );

    default:
      return null;
  }
};