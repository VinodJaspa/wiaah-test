import React, { FC, useState } from "react";
import Link from "next/link";
import { IoMdMail, IoMdKey } from "react-icons/io";
import { Button } from "@chakra-ui/react";
import { Spacer, DividerWidthText, Input } from "../../components";
import { LoginInputsType } from "../../../types/market/authenticating/loginInput.interface";
import { LoginType } from "../../../../apps/market/lib/LoignTypes";
import { useUserData, useLoginPopup } from "ui";
import { useTranslation } from "react-i18next";

export const LoginView: FC<{ setAuthView: (view: LoginType) => void }> = ({
  setAuthView,
}) => {
  const { initUserData } = useUserData();
  const { CloseLoginPopup } = useLoginPopup();
  const { t } = useTranslation();
  const [formInput, setFormInput] = useState<LoginInputsType>({
    email: "",
    password: "",
    remember_me: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initUserData({
      name: "Wiaah",
      email: "WiaahMarket@dev.com",
      accountType: "seller",
      photoSrc: "/wiaah_logo.png",
      id: "123",
    });
    CloseLoginPopup();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput((state) => ({ ...state, [e.target.name]: e.target.checked }));
  };

  return (
    <section id="LoginView">
      <h2 className="text-3xl">
        {t("Login_to_Wiaah", "Login to Wiaah account")}
      </h2>
      <Spacer spaceInRem={2} />
      <form className=" flex flex-col" onSubmit={handleSubmit}>
        <Input
          id="Email"
          name="email"
          placeholder="Email"
          type={"email"}
          value={formInput.email}
          onChange={(e) => handleInputChange(e)}
          icon={<IoMdMail />}
        />
        <Spacer />
        <Input
          id="Password"
          name="password"
          placeholder="Password"
          type={"password"}
          onChange={(e) => handleInputChange(e)}
          value={formInput.password}
          icon={<IoMdKey />}
        />
        <Spacer />
        <div className="flex items-center justify-between font-light">
          <div className="flex items-center justify-between pl-1">
            <input
              checked={formInput.remember_me}
              onChange={handleCheckBoxChange}
              name="remember_me"
              type="checkbox"
            />
            <span className="ml-2">{t("Remember_me", "Remember me")}</span>
          </div>
          <Link href="/forgot-password">
            <a className="text-blue-400">
              {t("Forgot_Password?", "Forgot Password?")}
            </a>
          </Link>
        </div>
        <Spacer />
        <Button type="submit">{t("log_in", "log in")}</Button>
      </form>
      <Spacer />
      <DividerWidthText text={t("new_to_wiaah?", "new to Wiaah ?")} />
      <div className="align flex w-full flex-col">
        <Button
          onClick={() => setAuthView("buyer-signup")}
          id="CreateNewAccountBtn"
          variant={"outline"}
        >
          {t("create_your_wiaah_account", "create your Wiaah Account now")}
        </Button>
      </div>
    </section>
  );
};
