import { Form, Formik } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  FormikInput,
  Button,
  SectionHeader,
  useChangePasswordMutation,
  setTestid,
  Input,
  useResponsive,
  HStack,
  ArrowLeftIcon,
} from "@UI";
import { useForm } from "@UI/../utils/src";
import { useRouting } from "@UI/../routing";
import * as yup from "yup";

export interface PasswordSectionProps { }
export interface PasswordSectionDTO {
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
}

export const PasswordSection: React.FC<PasswordSectionProps> = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { isMobile } = useResponsive();
  const { back } = useRouting();
  const { mutate, isLoading } = useChangePasswordMutation();
  const { inputProps, form } = useForm<Parameters<typeof mutate>[0]>(
    {
      confirmNewPassword: "",
      currentPassword: "",
      newPassword: "",
    },
    {},
    {
      addLabel: true,
      yupSchema: yup.object({
        currentPassword: yup.string().min(6).max(30),
        confirmNewPassword: yup.string().min(6).max(30),
        newPassword: yup.string().min(6).max(30),
      }),
    }
  );

  return isMobile ? (
    <div className="flex flex-col gap-6 p-2">
      <HStack className="justify-center relative">
        <p className="text-lg font-semibold">{t("Password")}</p>
        <button
          className="absolute top-1/2 -translate-y-1/2 left-0"
          onClick={() => back()}
        >
          <ArrowLeftIcon className="text-2xl" />
        </button>
        {/* <button
          className="absolute top-1/2 -translate-y-1/2 right-0"
          onClick={() => {}}
        >
          {t("Finish")}
        </button> */}
      </HStack>

      <Input
        {...inputProps("currentPassword")}
        placeholder={t("Type password") + "..."}
        isPassword
      ></Input>
      <HStack className="justify-end">
        <button onClick={() => { }}>
          <p className="text-sm text-primary">{t("Forgot Password?")}</p>
        </button>
      </HStack>
      <div className="flex flex-col gap-4">
        <Input
          {...inputProps("newPassword")}
          placeholder={t("Type password") + "..."}
          isPassword
        ></Input>
        <Input
          {...inputProps("confirmNewPassword")}
          placeholder={t("Type password") + "..."}
          isPassword
        ></Input>
      </div>
      <Button
        loading={isLoading}
        onClick={() => mutate(form)}
        className="w-full mt-3"
        colorScheme="darkbrown"
      >
        {t("Change Password")}
      </Button>
    </div>
  ) : (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        <SectionHeader sectionTitle={t("password", "Password")} />
        <Formik<PasswordSectionDTO>
          initialValues={{
            confirmPassword: "",
            newPassword: "",
            currentPassword: "",
          }}
          onSubmit={(data) => { }}
        >
          <React.Fragment>
            <FormikInput
              label={t("Current Password")}
              {...inputProps("currentPassword")}
              {...setTestid("current_password")}
              name="currentPassword"
              placeholder="current password"
            />
            <FormikInput
              label={t("New Password")}
              {...inputProps("newPassword")}
              {...setTestid("new_password")}
              name="newPassword"
              placeholder="new password"
            />
            <FormikInput
              label={t("Confirm Password")}
              {...inputProps("confirmNewPassword")}
              {...setTestid("confirm_password")}
              name="confirmPassword"
              placeholder="confirm password"
            />
          </React.Fragment>
        </Formik>
      </div>
      <div className="flex items-center gap-2 justify-between my-4 w-full px-4">
        <span
          {...setTestid("forgot_password")}
          className="text-primary cursor-pointer"
        >
          {t("forgot_password", "Forgot Password")}
        </span>
        <Button
          {...setTestid("submit")}
          onClick={() => {
            mutate(form);
          }}
          type="submit"
        >
          {t("Change Password")}
        </Button>
      </div>
    </React.Fragment>
  );
};
