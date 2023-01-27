import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType } from "types";
import {
  TranslationText,
  Switch,
  SectionHeader,
  useGetMySocialPrivacySettings,
  useUpdateMyPrivacySettings,
} from "@UI";

export interface PrivacySectionProps {}

export const PrivacySection: React.FC<PrivacySectionProps> = () => {
  const { t } = useTranslation();

  const { data: settings } = useGetMySocialPrivacySettings();
  const { mutate: updateSettings } = useUpdateMyPrivacySettings();

  return (
    <div className="flex flex-col w-full gap-8">
      <SectionHeader sectionTitle={t("privacy", "Privacy")} />
      <div className="flex w-full flex-col gap-4">
        {privacySectionOpts.map((opt, i) => (
          <div className="w-full flex justify-between">
            <TranslationText className="" translationObject={opt.name} />
            <div className="flex gap-2 items-center">
              <Switch
                checked={
                  settings && !!settings[opt.value as keyof typeof settings]
                }
                onChange={(checked) => updateSettings({ [opt.value]: checked })}
              />
              <p>{t("Push")}</p>
            </div>
          </div>
        ))}
      </div>
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
    value: "hideLikesNum",
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
    value: "hideCommentsNum",
  },
  {
    name: {
      translationKey: "hide_number_of_views",
      fallbackText: "Hide number of views",
    },
    value: "hideViewsNum",
  },
];
