import { IoMdMail, IoMdKey, IoMdPerson } from "react-icons/io";
import Link from "next/link";
import { t } from "i18next";
import React, { FC } from "react";
import { Button, Spacer, Input } from "../../components/index";

export interface BuyerSignupInputType {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_and_conditions: boolean;
}

export const BuyerSignupView: FC<{}> = () => {
  const [formInput, setFormInput] = React.useState<BuyerSignupInputType>({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    terms_and_conditions: false,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle signup api call
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput((state) => ({ ...state, [e.target.name]: e.target.checked }));
  };

  return (
    <section id="BuyerSignupView">
      <h2 className="text-3xl capitalize">
        {t("create_an_account", "create an account")}
      </h2>
      <Spacer spaceInRem={2} />
      <form onSubmit={handleSubmit} action="">
        <Input
          setId="Username"
          placeholder="Username"
          name="username"
          value={formInput.username}
          icon={<IoMdPerson />}
        />
        <Spacer />
        <Input
          setId="Email"
          name="email"
          placeholder="Email"
          value={formInput.email}
          icon={<IoMdMail />}
        />
        <Spacer />
        <Input
          setId="Password"
          name="password"
          placeholder="Password"
          value={formInput.password}
          icon={<IoMdKey />}
        />
        <Spacer />
        <Input
          setId="ConfirmPassword"
          name="confirm_password"
          placeholder="ConfirmPassword"
          value={formInput.confirm_password}
          icon={<IoMdKey />}
        />
        <Spacer />
        <div className="flex items-center justify-between font-light">
          <div className="flex items-center justify-between">
            <input className="pl-1" type="checkbox" />
            <p className="ml-2">
              I read and accept
              <Link href="/terms-conditions">
                <a className="text-blue-400"> terms and conditions.</a>
              </Link>
            </p>
          </div>
        </div>
        <Spacer />
        <Button type="submit" text="SIGN UP" />
      </form>
    </section>
  );
};
