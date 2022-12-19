import { IoMdMail, IoMdKey, IoMdPerson } from "react-icons/io";
import Link from "next/link";
import React, { FC } from "react";
import { Spacer, Button, FormikInput, Checkbox, CheckboxProps } from "@UI";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";

export interface BuyerSignupInputType {}

export const BuyerSignupView: FC<{}> = () => {
  const [formInput, setFormInput] = React.useState<BuyerSignupInputType>({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    terms_and_conditions: false,
  });
  const { t } = useTranslation();
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
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <FormikInput
                id="Username"
                placeholder="Username"
                name="username"
                icon={<IoMdPerson />}
              />
              <Spacer />
              <FormikInput
                id="Email"
                name="email"
                placeholder="Email"
                icon={<IoMdMail />}
              />
              <Spacer />
              <FormikInput
                id="Password"
                name="password"
                placeholder="Password"
                icon={<IoMdKey />}
              />
              <Spacer />
              <FormikInput
                id="ConfirmPassword"
                name="confirm_password"
                placeholder="ConfirmPassword"
                icon={<IoMdKey />}
              />
              <Spacer />
              <div className="flex items-center justify-between font-light">
                <div className="flex items-center justify-between">
                  <FormikInput<CheckboxProps>
                    as={Checkbox}
                    name="termsConditionsAggrement"
                    className="pl-1"
                  />
                  <p className="ml-2">
                    I read and accept
                    <Link href="/terms-conditions">
                      <a className="text-blue-400"> terms and conditions.</a>
                    </Link>
                  </p>
                </div>
              </div>
              <Spacer />
              <Button className="uppercase" type="submit">
                {t("signup", "sign up")}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};
