import React, { FC } from "react";
import { Input } from "antd";
import { IoMdMail, IoMdKey, IoMdPerson } from "react-icons/io";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const SellerSignupView: FC = () => {
  const { t } = useTranslation();
  return (
    <div id="SellerSignupView">
      <h2 className="text-3xl capitalize">
        {t("create_an_account", "create an account")}
      </h2>
      <form className="" action="">
        <Input
          className="mt-5"
          size="large"
          placeholder={t("Name", "Name")}
          type="text"
          prefix={<IoMdPerson className="mr-2 text-xl text-gray-400" />}
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
            <Input className="pl-1" type="checkbox" />
            <p className="ml-2">
              I read and accept
              <Link href="/terms-conditions">
                <a className="text-blue-400"> terms and conditions.</a>
              </Link>
            </p>
          </div>
        </div>
        <button className="green-background mt-5 h-12 w-full rounded-sm bg-white  px-8 py-2 text-lg uppercase text-white">
          {t("sign_up", "sign up")}
        </button>
      </form>
    </div>
  );
};
