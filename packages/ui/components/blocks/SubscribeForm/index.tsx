import React, { FC } from "react";
import { FaAt, FaUserAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from "../../partials";
import { useSubscribeToNewsletterMutation } from "../../features/Newsletter";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import InputField from "@UI/components/shadcn-components/Fields/InputField";

export interface SubscribeFormProps { }

export const SubscribeForm: FC<SubscribeFormProps> = () => {
  const { t } = useTranslation();
  const { mutate } = useSubscribeToNewsletterMutation();

  const validationSchema = yup.object({
    email: yup.string().email(t("Invalid email")).required(t("Required")),
    name: yup.string().min(3, t("Too short")).required(t("Required")),
  });

  return (
    <Formik
      initialValues={{ email: "", name: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutate(values);
        resetForm();
      }}
    >
      {({ isValid }) => (
        <Form className="block w-full  lg:col-span-2">
          {/* Title */}
          <p className="text-white font-semibold text-lg">
            {t("Wiaaah Alert EN")}
          </p>

          {/* Subtitle */}
          <p className="text-xs text-gray-400">
            {t("Register now to get updates on promotions and coupons")}
          </p>

          {/* Email */}
          <InputField
            label="Email"
            name="email"
            className="!mb-0"
            type="email"
            placeholder="Type email"
            icon={<FaAt className="h-4 w-4 text-gray-500" />}
            iconClassName="flex items-center justify-center mb-2"
          />

          {/* Name */}
          <InputField
            label="Name"
            name="name"
            type="text"
            className="!mb-0"
            placeholder={t("Name")}
            icon={<FaUserAlt className="h-4 w-4 text-gray-500" />}
             iconClassName="flex items-center justify-center mb-2"
          />

          {/* Button */}
          <PrimaryButton
            type="submit"

            className="px-5 py-2 text-sm mt-4 border-white text-white rounded-lg hover:bg-grey-600 hover:text-white"
            disabled={!isValid}
          >
            {t("Subscribe")}
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};
