import React, { FC, useState } from "react";
import Link from "next/link";
import { IoMdMail, IoMdKey } from "react-icons/io";
import { t } from "i18next";
import { Button, Spacer, DividerWidthText, Input } from "../../components";
import { LoginInputsType } from "../../../types/market/authenticating/loginInput.interface";
import { HandleLoginRequest } from "../../../../apps/market/ApiCalls/Authenticating/Login";
import { LoginType } from "../../../../apps/market/lib/LoignTypes";

export const LoginView: FC<{ setAuthView: (view: LoginType) => void }> = ({
  setAuthView,
}) => {
  const [formInput, setFormInput] = useState<LoginInputsType>({
    email: "",
    password: "",
    remember_me: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    HandleLoginRequest(formInput);
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
          setId="Email"
          name="email"
          placeholder="Email"
          value={formInput.email}
          onChange={(e) => handleInputChange(e)}
          icon={<IoMdMail />}
        />
        <Spacer />
        <Input
          setId="Password"
          name="password"
          placeholder="Password"
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
        <Button text={t("log_in", "log in")} />
      </form>
      <Spacer />
      <DividerWidthText text={t("new_to_wiaah?", "new to Wiaah ?")} />
      <Button
        onClick={() => setAuthView("buyer-signup")}
        id="CreateNewAccountBtn"
        outlined={true}
        type="submit"
        hexTextColor={"#000"}
        text={t("create_your_wiaah_account", "create your Wiaah Account now")}
      />
    </section>
  );
};
