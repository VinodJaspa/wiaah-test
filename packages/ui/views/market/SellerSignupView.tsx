import React, { FC } from "react";
import { FormikInput, Checkbox, Button } from "@UI";
import { IoMdMail, IoMdKey, IoMdPerson } from "react-icons/io";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";

export const SellerSignupView: FC<{ onSubmit?: (data: any) => any }> = ({
  onSubmit,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4" id="SellerSignupView">
      <h2 className="text-3xl capitalize">
        {t("create_an_account", "create an account")}
      </h2>
      <Formik
        initialValues={{}}
        onSubmit={(data) => {
          onSubmit && onSubmit(data);
        }}
      >
        {() => {
          return (
            <Form className="flex flex-col gap-4">
              <FormikInput
                name="name"
                placeholder={t("Name", "Name")}
                type="text"
                icon={<IoMdPerson className="mr-2 text-xl text-gray-400" />}
              />
              <FormikInput
                name="email"
                placeholder={t("Email", "Email")}
                type="email"
                icon={<IoMdMail className="mr-2 text-xl text-gray-400" />}
              />
              <FormikInput
                name="password"
                type="password"
                placeholder={t("Password", "Password")}
                iocn={<IoMdKey className="mr-2 text-xl text-gray-400" />}
              />
              <FormikInput
                name="confirmPassword"
                type="password"
                placeholder={t("confirm_Password", "confirm Password")}
                icon={<IoMdKey className="mr-2 text-xl text-gray-400" />}
              />
              <div className="mt-4 flex items-center justify-between font-light">
                <div className="flex items-center justify-between">
                  <Checkbox name="termsConditionAggrement" className="pl-1" />
                  <p className="ml-2">
                    I read and accept
                    <Link href="/terms-conditions">
                      <span className="text-blue-400">
                        {" "}
                        terms and conditions.
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
              <Button className="green-background mt-5 h-12 w-full rounded-sm bg-white  px-8 py-2 text-lg uppercase text-white">
                {t("sign_up", "sign up")}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
