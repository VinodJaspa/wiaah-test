import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FormikInput,
  Button,
  SectionHeader,
  useChangePasswordMutation,
  ChangePasswordInput,
  setTestid,
} from "@UI";

export interface PasswordSectionProps {}

export const PasswordSection: React.FC<PasswordSectionProps> = () => {
  const { t } = useTranslation();
  const { mutate } = useChangePasswordMutation();
  return (
    <>
      <Formik<ChangePasswordInput>
        initialValues={{
          confirmNewPassword: "",
          currentPassword: "",
          newPassword: "",
        }}
        onSubmit={(data) => {
          mutate(data);
        }}
      >
        {() => (
          <Form style={{ width: "100%" }}>
            <div className="flex flex-col gap-4">
              <SectionHeader sectionTitle={t("password", "Password")} />
              <FormikInput
                label={{
                  translationKey: "current_password",
                  fallbackText: "Current Password",
                }}
                {...setTestid("current_password")}
                name="currentPassword"
              />
              <FormikInput
                label={{
                  translationKey: "new_password",
                  fallbackText: "New Password",
                }}
                {...setTestid("new_password")}
                name="newPassword"
              />
              <FormikInput
                label={{
                  translationKey: "confirm_password",
                  fallbackText: "Confirm Password",
                }}
                {...setTestid("confirm_password")}
                name="confirmPassword"
              />
            </div>
            <div className="flex items-center gap-2 justify-between my-4 w-full px-4">
              <span
                {...setTestid("forgot_password")}
                className="text-primary cursor-pointer"
              >
                {t("forgot_password", "Forgot Password")}
              </span>
              <Button {...setTestid("submit")} type="submit">
                {t("Change Password")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
