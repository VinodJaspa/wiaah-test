import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType } from "types";
import { FormikInput, Switch, SectionHeader } from "ui";

export interface NewsLetterSectionProps {}

export const NewsLetterSection: React.FC<NewsLetterSectionProps> = ({}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex gap-8 flex-col">
      <SectionHeader sectionTitle={t("newsletter", "Newsletter")} />
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ values, setFieldValue }) => {
          return (
            <div className="w-full flex flex-col gap-4">
              {newsLetterOptions.map((opt, i) => (
                <FormikInput
                  label={opt.name}
                  containerProps={{
                    direction: "row",
                    w: "100%",
                    justify: "space-between",
                  }}
                  colorScheme={"primary"}
                  key={i}
                  name={opt.value}
                  as={() => (
                    <div className="flex gap-2">
                      <Switch
                        //@ts-ignore
                        checked={!!values[opt.value]}
                        onChange={(checked) =>
                          setFieldValue(opt.value, checked)
                        }
                      />
                      <span>{t("push", "Push")}</span>
                    </div>
                  )}
                />
              ))}
            </div>
          );
        }}
      </Formik>
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
