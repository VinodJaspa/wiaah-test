import React from "react";
import { Tabs, Input } from "antd";
import { IoMdMail, IoMdKey, IoMdPerson } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";
import { t } from "i18next";

const { TabPane } = Tabs;
export interface LoginViewProps {
  loginType: string;
}

export const LoginView: React.FC<LoginViewProps> = ({
  loginType = "login",
}) => {
  const router = useRouter();

  function handleActivateTabChange(activeKey: string) {
    if (activeKey == "1") {
      router.push("/login");
    } else if (activeKey == "2") {
      router.push("/buyer-signup");
    }
  }
  return (
    <>
      <div className="login-view-container xl:py-34 flex flex-col items-start p-4 lg:flex-row lg:p-24 xl:px-36">
        <div className="w-full text-white lg:w-7/12">
          <h1 className="text-3xl text-white lg:text-5xl">
            {t(
              "Welcome_to_Wiaah",
              "Welcome to Wiaah: The First and Reference Social Marketplace"
            )}
          </h1>
          <p className="text-md mt-5 mb-5 text-justify font-light lg:mt-10 lg:text-lg">
            {t(
              "With_Wiaah_Text",
              "With Wiaah, connect with the world's leading fashion brands and your favourite brands, participate in their success while succeding in your turn."
            )}
          </p>
          <div className="flex flex-col items-end text-lg font-light">
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
          <div className="rounded-lg bg-white px-7 pt-4 pb-6 shadow-xl lg:w-10/12">
            {(loginType == "login" || loginType == "buyer-signup") && (
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
                  <h2 className="text-3xl">
                    {t("Login_to_Wiaah", "Login to Wiaah account")}
                  </h2>
                  <form className="mt-7" action="">
                    <Input
                      size="large"
                      placeholder={t("Email", "Email")}
                      prefix={
                        <IoMdMail className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <Input
                      className="mt-5"
                      size="large"
                      type="password"
                      placeholder={t("Password", "Password")}
                      prefix={
                        <IoMdKey className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <div className="mt-4 flex items-center justify-between font-light">
                      <div className="flex items-center justify-between">
                        <Input type="checkbox" />
                        <span className="ml-2">
                          {t("Remember_me", "Remember me")}
                        </span>
                      </div>
                      <Link href="/forgot-password">
                        <a className="text-blue-400">
                          {t("Forgot_Password?", "Forgot Password?")}
                        </a>
                      </Link>
                    </div>
                    <button className="green-background mt-5 h-12 w-full rounded-sm bg-white  px-8 py-2 text-lg capitalize text-white">
                      {" "}
                      {t("log_in", "log in")}
                    </button>
                  </form>
                </TabPane>
                <TabPane
                  className="login-form"
                  tab={
                    <span className="px-5 text-xl font-light capitalize text-gray-800">
                      {t("buyer_signup", "Buyer Signup")}
                    </span>
                  }
                  key="2"
                >
                  <h2 className="text-3xl capitalize">
                    {t("create_an_account", "create an account")}
                  </h2>
                  <form className="mt-7" action="">
                    <Input
                      size="large"
                      placeholder={t("Username", "Username")}
                      type="text"
                      prefix={
                        <IoMdPerson className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <Input
                      className="mt-5"
                      size="large"
                      placeholder={t("Email", "Email")}
                      type="email"
                      prefix={
                        <IoMdMail className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <Input
                      className="mt-5"
                      size="large"
                      type="password"
                      placeholder={t("Password", "Password")}
                      prefix={
                        <IoMdKey className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <Input
                      className="mt-5"
                      size="large"
                      type="password"
                      placeholder={t("confirm_Password", "confirm Password")}
                      prefix={
                        <IoMdKey className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <div className="mt-4 flex items-center justify-between font-light">
                      <div className="flex items-center justify-between">
                        <Input type="checkbox" />
                        <p className="ml-2">
                          I read and accept
                          <Link href="/terms-conditions">
                            <a className="text-blue-400">
                              {" "}
                              terms and conditions.
                            </a>
                          </Link>
                        </p>
                      </div>
                    </div>
                    <button className="green-background mt-5 h-12 w-full rounded-sm bg-white px-8 py-2 text-lg uppercase text-white">
                      {t("sign_up", "sign up")}
                    </button>
                  </form>
                </TabPane>
              </Tabs>
            )}
            {loginType == "seller-signup" && (
              <div>
                <h2 className="text-3xl capitalize">
                  {t("create_an_account", "create an account")}
                </h2>
                <form className="" action="">
                  <Input
                    className="mt-5"
                    size="large"
                    placeholder={t("Name", "Name")}
                    type="text"
                    prefix={
                      <IoMdPerson className="mr-2 text-xl text-gray-400" />
                    }
                  />
                  <Input
                    className="mt-5"
                    size="large"
                    placeholder={t("Email", "Email")}
                    type="email"
                    prefix={<IoMdMail className="mr-2 text-xl text-gray-400" />}
                  />
                  <Input
                    className="mt-5"
                    size="large"
                    type="password"
                    placeholder={t("Password", "Password")}
                    prefix={<IoMdKey className="mr-2 text-xl text-gray-400" />}
                  />
                  <Input
                    className="mt-5"
                    size="large"
                    type="password"
                    placeholder={t("confirm_Password", "confirm Password")}
                    prefix={<IoMdKey className="mr-2 text-xl text-gray-400" />}
                  />
                  <div className="mt-4 flex items-center justify-between font-light">
                    <div className="flex items-center justify-between">
                      <Input type="checkbox" />
                      <p className="ml-2">
                        I read and accept
                        <Link href="/terms-conditions">
                          <a className="text-blue-400">
                            {" "}
                            terms and conditions.
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <button className="green-background mt-5 h-12 w-full rounded-sm bg-white  px-8 py-2 text-lg uppercase text-white">
                    {t("sign_up", "sign up")}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
