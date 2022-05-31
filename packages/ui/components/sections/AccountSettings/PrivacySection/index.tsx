import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType } from "types";
import { TranslationText, Switch, SectionHeader } from "ui";

export interface PrivacySectionProps {}

export const PrivacySection: React.FC<PrivacySectionProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full gap-8">
      <SectionHeader sectionTitle={t("privacy", "Privacy")} />
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className="flex w-full flex-col gap-4">
              {privacySectionOpts.map((opt, i) => (
                <div className="w-full flex justify-between">
                  <TranslationText className="" translationObject={opt.name} />
                  <div className="flex gap-2 items-center">
                    <Switch
                      //@ts-ignore
                      checked={!!values[opt.value]}
                      onChange={(checked) => setFieldValue(opt.value, checked)}
                    />
                    <p>{t("push", "Push")}</p>
                  </div>
                </div>
              ))}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const privacySectionOpts: FormOptionType[] = [
  {
    value: "privateAccount",
    name: {
      translationKey: "private_account",
      fallbackText: "Private Account",
    },
  },
  {
    value: "hideNumOfLikes",
    name: {
      translationKey: "hide_number_of_likes",
      fallbackText: "Hide number of Likes",
    },
  },
  {
    name: {
      translationKey: "hide_number_of_comments",
      fallbackText: "Hide number of comments",
    },
    value: "hideNumOfComments",
  },
  {
    name: {
      translationKey: "hide_number_of_views",
      fallbackText: "Hide number of views",
    },
    value: "hideNumOfViews",
  },
];
