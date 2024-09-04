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
} from "@UI";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { gql, useMutation } from "@apollo/client";
import { RegisterAccountType } from "@features/API";

export interface BuyerSignupInputType { }
// form fields schema
const BuyerSignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name is too short")
    .max(50, "First name is too long")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name is too short")
    .max(50, "Last name is too long")
    .required("Last name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  birthDate: Yup.date().required("Birthdate is required").nullable(),

  password: Yup.string()
    .min(8, "Password is too short")
    .max(100, "Password is too long")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),

  termsConditionsAggrement: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

// creating a new account
const REGISTER_MUTATION = gql`
  mutation Regester($input: RegisterDto!) {
    register(RegisterInput: $input) {
      success
      code
      message
    }
  }
`;

export const BuyerSignupView: FC<{}> = () => {
  const { t } = useTranslation();

  const [CreateNewAccount, { loading, error, data }] =
    useMutation(REGISTER_MUTATION);

  return (
    <section id="BuyerSignupView">
      <h2 className="text-3xl capitalize">
        {t("create_an_account", "create an account")}
      </h2>
      <Spacer spaceInRem={2} />
      <Formik
        validationSchema={BuyerSignupSchema}
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          email: "",
          birthDate: "",
          termsConditionsAggrement: false,
        }}
        onSubmit={async (values) => {
          try {
            const result = await CreateNewAccount({
              variables: {
                input: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  birthDate: values.birthDate,
                  accountType: RegisterAccountType.Buyer,
                  password: values.password,
                },
              },
            });
            console.log("Registration result:", result);
          } catch (error) {
            console.error("Registration error:", error);
          }
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="flex w-full justify-between items-center gap-3">
                <FormikInput
                  id="firstName"
                  placeholder="first name"
                  name="firstName"
                  icon={<IoMdPerson />}
                  containerProps={{
                    className: "w-full",
                  }}
                />
                <FormikInput
                  id="lastName"
                  placeholder="last name"
                  name="lastName"
                  icon={<IoMdPerson />}
                  containerProps={{
                    className: "w-full",
                  }}
                />
              </div>
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
                <div className="flex items-center justify-start gap-3 w-full">
                  <FormikInput<CheckboxProps>
                    as={Checkbox}
                    name="termsConditionsAggrement"
                    className="pl-1"
                    containerProps={{
                      className: "flex items-center w-fit cursor-pointer",
                    }}
                  />
                  <div className="ml-2 flex gap-1 items-center">
                    <p className="w-fit whitespace-nowrap">I read and accept</p>
                    <Link href="/terms-conditions">
                      <p className="text-blue-400 w-fit whitespace-nowrap ">
                        terms and conditions.
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <Spacer />
              <div className="w-full flex justify-center items-center">
                <Button className="uppercase px-4 " type="submit">
                  {t("signup", "sign up")}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};
