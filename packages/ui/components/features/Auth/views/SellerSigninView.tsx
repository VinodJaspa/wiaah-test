'use client';
import { useRouting } from "@UI/../routing";
import { setTestid, useForm } from "@UI/../utils/src";
import {
  Button,
  Checkbox,
  HStack,
  Input,
  Link,
  LogoColouredIcon,
} from "@partials";
import React from "react";
import { useSigninMutation } from "../services";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import Recaptcha from "react-google-recaptcha";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
type SellerSigninViewProps = {
  onNavigate: () => void;
};
export const SellerSigninView: React.FC<SellerSigninViewProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { getUrl } = useRouting();
  const router = useRouter();
  const { mutate: signin, isLoading } = useSigninMutation();

  const { form, inputProps } = useForm<Parameters<typeof signin>[0]>(
    {
      email: "",
      password: "",
    },
    {},
    {
      yupSchema: yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
      }),
      addLabel: true,
    }
  );

  return (
    <div
      style={{
        width: "min(100%,24rem)",
      }}
      className="flex flex-col gap-10 mx-auto p-8 h-full justify-center items-center"
    >
      <LogoColouredIcon className="text-9xl" />
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <Input
            {...setTestid("login-username-input")}
            {...inputProps("email")}
            className="w-full"
          />
          <Input
            {...setTestid("login-password-input")}
            isPassword
            {...inputProps("password")}
            className="w-full"
          />
        </div>

        <HStack className="justify-between w-full">
          <HStack>
            <Checkbox {...setTestid("login-remember-me-input")} />
            <p className="text-sm">{t("Remember me")}</p>
          </HStack>

          <Link href={getUrl((r) => r.visitChangePassword())}>
            <button {...setTestid("login-forgot-password-btn")}>
              <p className="text-sm">{t("forgot password?")}</p>
            </button>
          </Link>
        </HStack>
      </div>
      <Recaptcha sitekey={"6LfEeDQrAAAAAIfYlrUyUSyxdbrRNTEcSDuz18Yg"} />
      <Button
        {...setTestid("login-form-submit-btn")}
        onClick={() =>
          signin(form, {
            onSuccess: (res: any) => {
              if (res.success) {
                const token = res?.accessToken;
                if (token) {
                  toast.success(res?.message || "Sign in successful!");
                  // router.push("/"); 
                } else {
                  toast.error("Login succeeded but no token received.");
                }
              } else {
                toast.error(res?.message || "Sign in successful!");

              }

            },
            onError: (err: any) => {
              const message =
                err?.response?.data?.message ||
                err?.message ||
                "Sign in failed. Please try again.";
              toast.error(message);
            },
          })
        }
        disabled={isLoading}
        className={`font-medium w-full ${isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        colorScheme="darkbrown"
      >
        {isLoading ? t("Signing in...") : t("Sign in")}
      </Button>


      <p>
        {t("Don't have an account?")}
        <span>
          <button className="text-primary" onClick={onNavigate}>
            {t("Register")}
          </button>
        </span>

      </p>
    </div>
  );
};
