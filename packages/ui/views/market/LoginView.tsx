import React from "react";
import { Tabs, Input } from "antd";
import {IoMdMail,IoMdKey,IoMdPerson,
} from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";

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
      <div className="login-view-container flex flex-col-reverse items-start p-4 lg:flex-row lg:p-24 xl:p-36">
        <div className="hidden w-full text-white lg:block lg:w-7/12">
          <h1 className="text-5xl text-white">
            Welcome to Wiaah: The First and Reference Social Marketplace
          </h1>
          <p className="mt-10 mb-5 text-justify text-lg font-light">
            With Wiaah, connect with the world's leading fashion brands and your
            favourite brands, participate in their success while succeding in
            your turn.
          </p>
          <div className="flex flex-col items-end text-lg font-light">
            <cite className="text-justify">
              "It is by participating in the success of others that we acheive
              our own success"
            </cite>
            <div className="mt-5">Founder of Wiaah</div>
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
                  className="login-form flex h-full flex-col justify-center"
                  tab={
                    <span className="px-5 text-xl font-light text-gray-800">
                      Login!
                    </span>
                  }
                  key="1"
                >
                  <h2 className="text-3xl">Login to Wiaah account</h2>
                  <form className="mt-7" action="">
                    <Input
                      size="large"
                      placeholder="E-mail"
                      prefix={
                        <IoMdMail className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <Input
                      className="mt-5"
                      size="large"
                      type="password"
                      placeholder="Password"
                      prefix={
                        <IoMdKey className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <div className="mt-4 flex items-center justify-between font-light">
                      <div className="flex items-center justify-between">
                        <Input type="checkbox" />
                        <span className="ml-2">Remember me</span>
                      </div>
                      <Link href="/forgot-password">
                        <a className="text-blue-400">Forgot Password?</a>
                      </Link>
                    </div>
                    <button className="green-background mt-5 h-12 w-full rounded-sm  bg-white px-8 py-2 text-lg text-white">
                      {" "}
                      LOG IN
                    </button>
                  </form>
                </TabPane>
                <TabPane
                  className="login-form"
                  tab={
                    <span className="px-5 text-xl font-light text-gray-800">
                      Buyer Signup
                    </span>
                  }
                  key="2"
                >
                  <h2 className="text-3xl">Create An Account</h2>
                  <form className="mt-7" action="">
                    <Input
                      size="large"
                      placeholder="Username"
                      type="text"
                      prefix={
                        <IoMdPerson className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <Input
                      className="mt-5"
                      size="large"
                      placeholder="E-mail"
                      type="email"
                      prefix={
                        <IoMdMail className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <Input
                      className="mt-5"
                      size="large"
                      type="password"
                      placeholder="Password"
                      prefix={
                        <IoMdKey className="mr-2 text-xl text-gray-400" />
                      }
                    />
                    <Input
                      className="mt-5"
                      size="large"
                      type="password"
                      placeholder="Comfirm Password"
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
                    <button className="green-background mt-5 h-12 w-full rounded-sm  bg-white px-8 py-2 text-lg text-white">
                      SIGN UP
                    </button>
                  </form>
                </TabPane>
              </Tabs>
            )}
            {loginType == "seller-signup" && (
              <div>
                <h2 className="text-3xl">Create An Account</h2>
                <form className="" action="">
                  <Input
                    className="mt-5"
                    size="large"
                    placeholder="Name"
                    type="text"
                    prefix={
                      <IoMdPerson className="mr-2 text-xl text-gray-400" />
                    }
                  />
                  <Input
                    className="mt-5"
                    size="large"
                    placeholder="E-mail"
                    type="email"
                    prefix={<IoMdMail className="mr-2 text-xl text-gray-400" />}
                  />
                  <Input
                    className="mt-5"
                    size="large"
                    type="password"
                    placeholder="Password"
                    prefix={<IoMdKey className="mr-2 text-xl text-gray-400" />}
                  />
                  <Input
                    className="mt-5"
                    size="large"
                    type="password"
                    placeholder="Comfirm Password"
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
                  <button className="green-background mt-5 h-12 w-full rounded-sm  bg-white px-8 py-2 text-lg text-white">
                    SIGN UP
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
