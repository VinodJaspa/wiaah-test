import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormikInput, Button } from "ui";

export interface PasswordSectionProps {}

export const PasswordSection: React.FC<PasswordSectionProps> = () => {
  const { t } = useTranslation();
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <Form style={{ width: "100%" }}>
          <div className="flex flex-col gap-4">
            <span className="text-4xl font-bold">
              {t("password", "Password")}
            </span>
            <FormikInput
              label={{
                translationKey: "current_password",
                fallbackText: "Current Password",
              }}
              name="currentPassword"
            />
            <FormikInput
              label={{
                translationKey: "new_password",
                fallbackText: "New Password",
              }}
              name="newPassword"
            />
            <FormikInput
              label={{
                translationKey: "confirm_password",
                fallbackText: "Confirm Password",
              }}
              name="confirmPassword"
            />
          </div>
          <div className="flex items-center gap-2 justify-between my-4 w-full px-4">
            <span className="text-primary cursor-pointer">
              {t("forgot_password", "Forgot Password")}
            </span>
            <Button>{t("change_password", "Change Password")}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
