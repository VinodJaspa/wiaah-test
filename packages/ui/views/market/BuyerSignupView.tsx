import { Input } from "antd";
import { IoMdMail, IoMdKey, IoMdPerson } from "react-icons/io";
import Link from "next/link";
import { t } from "i18next";
import React, { FC } from "react";
import { Button, Spacer } from "../../components/index";

export const BuyerSignupView: FC = () => {
  return (
    <section id="BuyerSignupView">
      <h2 className="text-3xl capitalize">
        {t("create_an_account", "create an account")}
      </h2>
      <Spacer spaceInRem={2} />
      <form action="">
        <Input
          className="h-12"
          placeholder={t("Username", "Username")}
          type="text"
          prefix={<IoMdPerson className="mr-2 text-xl text-gray-400" />}
        />
        <Spacer />
        <Input
          className="h-12"
          placeholder={t("Email", "Email")}
          type="email"
          prefix={<IoMdMail className="mr-2 text-xl text-gray-400" />}
        />
        <Spacer />
        <Input
          className="h-12"
          type="password"
          placeholder={t("Password", "Password")}
          prefix={<IoMdKey className="mr-2 text-xl text-gray-400" />}
        />
        <Spacer />
        <Input
          className="h-12"
          type="password"
          placeholder={t("confirm_Password", "confirm Password")}
          prefix={<IoMdKey className="mr-2 text-xl text-gray-400" />}
        />
        <Spacer />
        <div className="flex items-center justify-between font-light">
          <div className="flex items-center justify-between">
            <Input className="pl-1" type="checkbox" />
            <p className="ml-2">
              I read and accept
              <Link href="/terms-conditions">
                <a className="text-blue-400"> terms and conditions.</a>
              </Link>
            </p>
          </div>
        </div>
        <Spacer />
        <Button text="SIGN UP" />
      </form>
    </section>
  );
};
