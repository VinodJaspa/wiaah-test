import React, { FC, useState } from "react";
import Link from "next/link";
import { IoMdMail, IoMdKey } from "react-icons/io";
import { Spacer, DividerWidthText, Input } from "@UI";
import { LoginInputsType } from "types";
import { LoginType } from "types";
import { useUserData, useLoginPopup, Button, FormikInput } from "@UI";
import { useTranslation } from "react-i18next";
import { Form, Formik, FormikHelpers } from "formik";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import * as Yup from "yup";

type loginInput = {
  email: string;
  password: string;
  remember_me: boolean;
};

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  remember_me: Yup.boolean(),
});

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginDto!) {
    login(LoginInput: $input) {
      success
      code
      message
    }
  }
`;

export const LoginView: FC<{
  setAuthView: (view: LoginType) => void;
  onSubmit: (data: loginInput) => any;
}> = ({ setAuthView, onSubmit }) => {
  const router = useRouter();
  const { CloseLoginPopup } = useLoginPopup();
  const { t } = useTranslation();

  const [formInput, setFormInput] = useState<LoginInputsType>({
    email: "",
    password: "",
    remember_me: false,
  });

  const [loginToAccount, { loading }] = useMutation(LOGIN_MUTATION);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput((state) => ({ ...state, [e.target.name]: e.target.checked }));
  };

  const handleSubmit = async (
    values: loginInput,
    { setSubmitting }: FormikHelpers<loginInput>
  ) => {
    setErrorMessage(null); // Clear any previous errors
    try {
      const result = await loginToAccount({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });

      if (result.data.login.success) {
        // Handle successful login (e.g., redirect the user)
        router.push("/"); // Example: redirect to a dashboard
      } else {
        setErrorMessage(result.data.login.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }

    setSubmitting(false);
  };

  return (
    <section id="LoginView">
      <h2 className="text-3xl">
        {t("Login_to_Wiaah", "Login to Wiaah account")}
      </h2>
      <Spacer spaceInRem={2} />
      <Formik<loginInput>
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "", remember_me: false }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <FormikInput
              id="Email"
              name="email"
              placeholder="Email"
              type={"email"}
              icon={<IoMdMail />}
            />

            {errorMessage && errorMessage === "Invalid email" && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <Spacer />
            <FormikInput
              id="Password"
              name="password"
              placeholder="Password"
              type={"password"}
              icon={<IoMdKey />}
            />
            <Spacer />
            {errorMessage && errorMessage === "Invalid password" && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
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
                <span className="text-blue-400">
                  {t("Forgot_Password?", "Forgot Password?")}
                </span>
              </Link>
            </div>
            <Spacer />
            <Button type="submit" disabled={isSubmitting}>
              {t("log_in", "log in")}
            </Button>
            <Spacer />
          </Form>
        )}
      </Formik>
      <DividerWidthText text={t("new_to_wiaah?", "new to Wiaah ?")} />
      <div className="align flex w-full flex-col">
        <Button
          onClick={() => setAuthView("buyer-signup")}
          id="CreateNewAccountBtn"
          outline
        >
          {t("create_your_wiaah_account", "create your Wiaah Account now")}
        </Button>
      </div>
    </section>
  );
};
