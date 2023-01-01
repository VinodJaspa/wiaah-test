import { Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType } from "types";
import {
  MediaUploadModal,
  SectionHeader,
  FormikInput,
  Select,
  SelectOption,
  TranslationText,
  useFileUploadModal,
  Button,
  SelectProps,
} from "@UI";
import { AccountVerificationRequestScheme } from "validation";

export interface AccountVerificationProps {}

export const AccountVerification: React.FC<AccountVerificationProps> = () => {
  const { t } = useTranslation();
  const { uploadImage } = useFileUploadModal();

  return (
    <div className="flex flex-col gap-8 text-gray-500">
      <SectionHeader
        className="text-black"
        sectionTitle={t("request_verification", "Request Verification")}
      />
      <span className="text-black text-xl">
        {t(
          "apply_for_instagram_verification",
          "Apply for Instagram Verification"
        )}
      </span>

      <p>
        {t(
          "instagram_verification_explaintion",
          "A verified badge is a check that appears next to an Instagram account's name to indicate that the account is the authentic presence of a notable public figure, celebrity, global brand or entity it represents"
        )}
      </p>
      <p>
        {t(
          "verification_not_guarantee",
          "Submittung a request for verification does not guarantee that your account will be verified."
        )}
      </p>
      <Formik
        validationSchema={AccountVerificationRequestScheme}
        initialValues={{
          username: "",
          fullName: "",
          knownAs: "",
          category: "",
          IdPhoto: null,
        }}
        onSubmit={() => {}}
      >
        {({ setFieldValue }) => {
          return (
            <Form className="flex flex-col gap-8">
              <FormikInput
                label={{
                  translationKey: "username",
                  fallbackText: "Username",
                }}
                flushed
                name="username"
              />
              <FormikInput
                label={{
                  translationKey: "full_name",
                  fallbackText: "Full Name",
                }}
                name="fullName"
                flushed
              />
              <FormikInput
                label={{
                  translationKey: "known_as",
                  fallbackText: "Known As",
                }}
                name="knownAs"
                flushed
              />
              <FormikInput<SelectProps>
                label={{
                  translationKey: "category",
                  fallbackText: "Category",
                }}
                flushed
                onOptionSelect={(v) => setFieldValue("category", v)}
                name="category"
                placeholder={t(
                  "select_a_category_for_your_account",
                  "Select a category for your account"
                )}
                as={Select}
              >
                {AccountCategoryOpts.map((cate, i) => (
                  <SelectOption key={i} value={cate.value}>
                    <TranslationText translationObject={cate.name} />
                  </SelectOption>
                ))}
              </FormikInput>
              <div className="flex items-center gap-4 justify-between">
                <span className="text-black font-bold">
                  {t(
                    "please_attach_a_photo_of_your_id",
                    "Please attach a photo of your ID"
                  )}
                </span>
                <div className="flex flex-col gap-2">
                  <span
                    onClick={() => uploadImage()}
                    className="cursor-pointer text-primary"
                  >
                    {t("choose_file", "Choose File")}
                  </span>
                  <span className="text-red-400">
                    <ErrorMessage name="IdPhoto" />
                  </span>
                </div>
                <MediaUploadModal
                  onImgUpload={(_, file) => setFieldValue("IdPhoto", file)}
                />
              </div>
              <p>
                {t(
                  "government_issued_photo_id_require",
                  "We require a government-issued photo ID that shows your name and date of birth (e.g. driver's license, passport or national identification card) or official business documents (tax filing, recent utility bill, article of incorporation) in order to review your request"
                )}
              </p>
              <Button type="submit" className="sm:w-fit self-end">
                {t("send", "Send")}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const AccountCategoryOpts: FormOptionType[] = [
  {
    name: {
      translationKey: "category 1",
      fallbackText: "category 1",
    },
    value: "category",
  },
  {
    name: {
      translationKey: "category 1",
      fallbackText: "category 1",
    },
    value: "category",
  },
  {
    name: {
      translationKey: "category 1",
      fallbackText: "category 1",
    },
    value: "category",
  },
  {
    name: {
      translationKey: "category 1",
      fallbackText: "category 1",
    },
    value: "category",
  },
];
