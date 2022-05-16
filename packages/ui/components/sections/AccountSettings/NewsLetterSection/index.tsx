import { Flex, Switch, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType } from "types";
import { FormikInput } from "../../../blocks";

export interface NewsLetterSectionProps {}

export const NewsLetterSection: React.FC<NewsLetterSectionProps> = ({}) => {
  const { t } = useTranslation();
  return (
    <Flex w="100%" gap="2rem" direction={"column"}>
      <Text fontSize={"xx-large"} fontWeight="bold">
        {t("newsletter", "Newsletter")}
      </Text>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            <Flex w="100%" direction={"column"} gap="1rem">
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
                    <Flex gap="0.5rem">
                      <Switch colorScheme={"primary"} />
                      <Text>{t("push", "Push")}</Text>
                    </Flex>
                  )}
                />
              ))}
            </Flex>
          );
        }}
      </Formik>
    </Flex>
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
