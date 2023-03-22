import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType } from "types";
import { FormikInput, Switch, SectionHeader, TranslationText } from "@UI";
import { useForm } from "@UI/../utils/src";

export interface NewsLetterSectionProps {}

export const NewsLetterSection: React.FC<NewsLetterSectionProps> = ({}) => {
  const { t } = useTranslation();

  const { form, setValue } = useForm({});

  return (
    <div className="w-full flex gap-8 flex-col">
      <SectionHeader sectionTitle={t("newsletter", "Newsletter")} />
      <div className="w-full flex flex-col gap-4">
        {newsLetterOptions.map((opt, i) => (
          <div className="flex justify-between w-full items-center" key={i}>
            <span className="font-semibold text-xl">
              <TranslationText translationObject={opt.name} />
            </span>
            <div className="flex gap-2">
              <Switch checked={false} onChange={(checked) => ""} />
              <span>{t("push", "Push")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const newsLetterOptions: FormOptionType[] = [
  {
    name: {
      translationKey: "feedback_emails",
      fallbackText: "Feedback Emails",
    },
    value: "feedbackEmails",
  },
  {
    name: {
      translationKey: "reminder_emails",
      fallbackText: "Reminder Emails",
    },
    value: "reminderEmails",
  },
  {
    name: {
      translationKey: "product_emails",
      fallbackText: "Product Emails",
    },
    value: "productEmails",
  },
  {
    name: {
      translationKey: "news_emails",
      fallbackText: "News Emails",
    },
    value: "newsEmails",
  },
];
