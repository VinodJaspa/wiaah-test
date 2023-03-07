import { IoMdMail, IoMdKey, IoMdPerson } from "react-icons/io";
import Link from "next/link";
import React, { FC } from "react";
import {
  Spacer,
  Button,
  FormikInput,
  Checkbox,
  CheckboxProps,
  HStack,
  CalenderIcon,
  DateFormInput,
  DateFormInputProps,
} from "@UI";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { useForm } from "utils";

export interface BuyerSignupInputType {}

export const BuyerSignupView: FC<{ onSubmit?: (data: any) => any }> = ({
  onSubmit,
}) => {
  const { dateInputProps, form, handleChange, inputProps, selectProps } =
    useForm<BuyerSignupInputType>({
      firstName: "",
      lastName: "",
      password: "",
      confirm_password: "",
      email: "",
      birthday: "",
      terms_and_conditions: false,
    });
  const { t } = useTranslation();

  return (
    <section id="BuyerSignupView">
      <h2 className="text-3xl capitalize">
        {t("create_an_account", "create an account")}
      </h2>
      <Spacer spaceInRem={2} />
      <Formik<any>
        initialValues={{}}
        onSubmit={(data) => {
          onSubmit && onSubmit(data);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <HStack>
                <FormikInput
                  id="firstName"
                  placeholder="first name"
                  name="firstName"
                  icon={<IoMdPerson />}
                />
                <FormikInput
                  id="lastName"
                  placeholder="last name"
                  name="lastName"
                  icon={<IoMdPerson />}
                />
              </HStack>
              <Spacer />
              <FormikInput
                id="Email"
                name="email"
                placeholder="Email"
                icon={<IoMdMail />}
              />
              <Spacer />
              <FormikInput<any>
                id="BirthDate"
                name="birthDate"
                placeholder="BirthDate"
                as={DateFormInput}
                dateValue={values?.birthDate}
                onDateChange={(e: any) => setFieldValue("birthDate", e)}
                icon={<CalenderIcon />}
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
                name="confirmPassword"
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
                      <span className="text-blue-400">
                        {" "}
                        terms and conditions.
                      </span>
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
