import React, { FC, useState } from "react";
import Link from "next/link";
import { IoMdMail, IoMdKey } from "react-icons/io";
import { Input } from "antd";
import { t } from "i18next";
import { Button } from "../../components/partials/Button";
import { DividerWidthText } from "../../components/partials/DividerWithText";
import { Spacer } from "../../components/partials/Spacer";
import { LoginInputsType } from "../../../types/market/authenticating/loginInput.interface";
import { HandleLoginRequest } from "../../../../apps/market/ApiCalls/Authenticating/Login";

export const LoginView: FC = () => {
  const [FormInput, setFormInput] = useState<LoginInputsType>({
    email: "",
    password: "",
    remember_me: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    HandleLoginRequest(FormInput);
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
      <form onSubmit={handleSubmit}>
        <Input
          id="EmailInput"
          name="email"
          className="h-12"
          value={FormInput.email}
          onChange={handleInputChange}
          placeholder={t("Email", "Email")}
          prefix={<IoMdMail className="mr-2 text-xl text-gray-400" />}
        />
        <Spacer />
        <Input
          name="password"
          id="PasswordInput"
          className="h-12"
          value={FormInput.password}
          onChange={handleInputChange}
          type="password"
          placeholder={t("Password", "Password")}
          prefix={<IoMdKey className="mr-2 text-xl text-gray-400" />}
        />
        <Spacer />
        <div className="flex items-center justify-between font-light">
          <div className="flex items-center justify-between pl-1">
            <Input
              checked={FormInput.remember_me}
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
        <Button text={t("log_in", "log in")} />
      </form>
      <Spacer />
      <DividerWidthText text={t("new_to_wiaah?", "new to Wiaah ?")} />
      <Link href="/buyer-signup">
        <Button
          id="CreateNewAccountBtn"
          outlined={true}
          type="submit"
          hexTextColor={"#000"}
          text={t("create_your_wiaah_account", "create your Wiaah Account now")}
        />
      </Link>
    </section>
  );
};
