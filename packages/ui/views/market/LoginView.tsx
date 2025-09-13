import React, { FC, useState } from "react";
import Link from "next/link";
import { IoMdMail, IoMdKey } from "react-icons/io";
import { Spacer, DividerWidthText, Input } from "@UI";
import { LoginInputsType } from "types";
import { LoginType } from "types";
import { useLoginPopup, Button, FormikInput } from "@UI";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useSigninMutation } from "@features/Auth";
import { errorToast, successToast } from "utils";
import { useSetRecoilState } from "recoil";
import { isUserLoggedIn } from "state";


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

export const LoginView: FC<{
  setAuthView: (view: LoginType) => void;
  onSubmit: (data: loginInput) => any;
}> = ({ setAuthView, onSubmit }) => {
  const router = useRouter();
  const { CloseLoginPopup } = useLoginPopup();
  const { t } = useTranslation();
 const setUserLoggedIn = useSetRecoilState(isUserLoggedIn);
  const [formInput, setFormInput] = useState<LoginInputsType>({
    email: "",
    password: "",
    remember_me: false,
  });

  const { mutate: signin, isLoading } = useSigninMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput((state) => ({ ...state, [e.target.name]: e.target.checked }));
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
        onSubmit={(data) => {
          const payload = {
            email: data.email,
            password: data.password,
          };
        
          signin(payload, {
            onSuccess: (res: any) => {
              if (res.success) {
                const token = res.accessToken;
                if (token) {
                  setUserLoggedIn(true);
                  successToast(res.message || "Sign in successful!");
                  router.push("/");
                }
              } else {
                console.log(res, "response");
                const errorMessage =
                  res.response?.errors?.[0]?.message || res.message || "Unknown error";
                errorToast(errorMessage);
              }
            },
            onError: (err: any) => {
              const message = err.response?.data?.message || err.message || "Sign in failed. Please try again.";
              errorToast(message);
            },
          });
        }}
        
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
            <Button type="submit" disabled={isLoading}>
            {isLoading ? t("Signing in...") : t("Sign in")}
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
          {t("create_your_wiaah_account", "Create your wiaah account now")}
        </Button>
      </div>
    </section>
  );
};
