import React, { useImperativeHandle, useState, useRef } from "react";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useGetMyAccountQuery } from "@features/Accounts";
import { useResponsive } from "hooks";
import {
    useVerifyEmailMutation,
    useResendRegisterationCodeMutation,
} from "@features/Auth/services";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
// @ts-ignore
import OtpVerfication from "./assest/OtpReceived.svg";
import { errorToast, successToast } from "utils";
import { useRecoilState } from "recoil";
import { accountFormState, formStepState } from "@UI/store/sellerAccountFormState.atom";

export type AccountSignEmailVerificationStepRef = {
    submit: () => Promise<boolean>;
};

interface FormValues {
    code: string;
}

export const AccountSignEmailVerificationStep = React.forwardRef<
  AccountSignEmailVerificationStepRef,
  { onSuccess: () => void }
>(({ onSuccess }, ref) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const email = sessionStorage.getItem("signup_email");

  const { mutateAsync: verifyEmail } = useVerifyEmailMutation();
  const { mutate: resendCode } = useResendRegisterationCodeMutation();

  const [cooldown, setCooldown] = useState(0);
  const formRef = useRef<FormikProps<FormValues>>(null);

React.useEffect(() => {
  if (cooldown > 0) {
    const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }
  return undefined; // also valid
}, [cooldown]);



  const handleResend = () => {
    if (!email) {
      errorToast("Missing email in session");
      return;
    }

    if (cooldown === 0) {
      resendCode({ email });
      setCooldown(30);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      if (!formRef.current) return false;

      const errors = await formRef.current.validateForm();
      const isValid = Object.keys(errors).length === 0;
      if (!isValid) return false;

      const form = formRef.current.values;

      try {
        if (!email) {
          errorToast("Missing email in session");
          return false;
        }

        const res = await verifyEmail({ code: form.code, email });

        successToast("Email verified successfully!");
        onSuccess?.();
        return true;
      } catch (err: any) {
        console.error("Verification error:", err);
        errorToast(err?.message || "Verification failed");
        return false;
      }
    },
  }));

  return (
    <Formik<FormValues>
      innerRef={formRef}
      initialValues={{ code: "" }}
      validationSchema={Yup.object({
        code: Yup.string()
          .length(6, "Enter 6 digit code")
          .required("Code is required"),
      })}
      onSubmit={() => {}}
    >
      {() => (
        <Form className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Check your inbox</h2>
            <p className="text-gray-600">
              We've sent a verification code to your email address (<b>{email}</b>).
              Please enter it below.
            </p>
          </div>

          <div className="flex justify-center">
            <img src={OtpVerfication.src} alt="email" className="w-32 h-32" />
          </div>

          <InputField
            name="code"
            label="Verification Code"
            placeholder="Enter 6-digit code"
            maxLength={6}
          />

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <button
              type="button"
              onClick={handleResend}
              className="w-full sm:w-auto text-sm text-gray-600 hover:underline bg-gray-100 px-3 py-2 rounded-md disabled:opacity-50"
              disabled={cooldown > 0}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
});

