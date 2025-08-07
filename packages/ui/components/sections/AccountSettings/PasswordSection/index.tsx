import { Formik, Form } from "formik";
import * as React from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Input,
  SectionHeader,
  useResponsive,
  useChangePasswordMutation,
  HStack,
  ArrowLeftIcon,
  setTestid,
} from "@UI";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import { useRouting } from "@UI/../routing";
import { successToast,errorToast } from "utils";


export interface PasswordSectionProps {}

interface PasswordSectionDTO {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const validationSchema = yup.object({
  currentPassword: yup.string().min(6).max(30).required("Current password is required"),
  newPassword: yup.string().min(6).max(30).required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});

export const PasswordSection: React.FC<PasswordSectionProps> = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const { back } = useRouting();
  const { mutate, isLoading } = useChangePasswordMutation();

  const initialValues: PasswordSectionDTO = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const handleSubmit = (values: PasswordSectionDTO) => {
    mutate(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      },
      {
        onSuccess: () => {
      successToast(t("Password updated successfully"));
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.errors?.[0]?.message;
          console.log('Error message:', errorMessage);
          
          errorToast(errorMessage|| t("Something went wrong"));
        },
      }
    );
  };
  

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => (
        <Form>
          {isMobile ? (
            <div className="flex flex-col gap-6 p-2">
              <HStack className="justify-center relative">
                <p className="text-lg font-semibold">{t("Password")}</p>
                <button
                  type="button"
                  className="absolute top-1/2 -translate-y-1/2 left-0"
                  onClick={() => back()}
                >
                  <ArrowLeftIcon className="text-2xl" />
                </button>
              </HStack>

              <Input
                name="currentPassword"
                isPassword
                placeholder={t("Type password") + "..."}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.currentPassword}
                error={touched.currentPassword && errors.currentPassword}
              />

              <Input
                name="newPassword"
                isPassword
                placeholder={t("Type password") + "..."}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPassword}
                error={touched.newPassword && errors.newPassword}
              />

              <Input
                name="confirmNewPassword"
                isPassword
                placeholder={t("Type password") + "..."}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmNewPassword}
                error={touched.confirmNewPassword && errors.confirmNewPassword}
              />

              <PrimaryButton type="submit" disabled={isLoading}>
                {t("Update Password")}
              </PrimaryButton>
            </div>
          ) : (
            <div className="flex flex-col gap-4 ml-10 mr-10">
              <SectionHeader sectionTitle={t("password", "Change Password")} />

              <Input
                label={t("Current Password")}
                name="currentPassword"
                placeholder="current password"
                isPassword
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.currentPassword}
                error={touched.currentPassword && errors.currentPassword}
                {...setTestid("current_password")}
              />

              <Input
                label={t("New Password")}
                name="newPassword"
                placeholder="new password"
                isPassword
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPassword}
                error={touched.newPassword && errors.newPassword}
                {...setTestid("new_password")}
              />

              <Input
                label={t("Confirm Password")}
                name="confirmNewPassword"
                placeholder="confirm password"
                isPassword
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmNewPassword}
                error={touched.confirmNewPassword && errors.confirmNewPassword}
                {...setTestid("confirm_password")}
              />

              <div className="flex justify-end">
                <PrimaryButton type="submit" disabled={isLoading}>
                  {t("Update Password")}
                </PrimaryButton>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
