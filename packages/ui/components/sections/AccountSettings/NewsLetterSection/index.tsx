import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType } from "types";
import {
  Switch,
  SectionHeader,
  TranslationText,
  useUpdateUserNewsletterSettingsMutation,
  useGetUserNewsletterSettingsQuery,
  useResponsive,
  Stack,
  Divider,
  HStack,
  Button,
} from "@UI";
import { useForm } from "@UI/../utils/src";

export interface NewsLetterSectionProps {
  userId: string;
}

export const AccountNewsLetterSettingsSection: React.FC<
  NewsLetterSectionProps
> = ({ userId }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { isMobile } = useResponsive();
  const { data } = useGetUserNewsletterSettingsQuery({ userId });
  const { switchInputProps, form } = useForm<
    Parameters<typeof mutate>[0]["args"]
  >({
    ...(data || {}),
  });
  const { mutate } = useUpdateUserNewsletterSettingsMutation();

  return isMobile ? (
    <div className="flex flex-col gap-8 p-2">
      <SectionHeader sectionTitle={t("newsletter", "Newsletter")} />
      <Stack col divider={<Divider />}>
        {newsLetterOptions.map((opt, i) => (
          <HStack className="justify-between" key={i}>
            <span className="font-semibold text-xl">
              <TranslationText translationObject={opt.name} />
            </span>
            <Switch variant="alt" {...switchInputProps(opt.value as any)} />
          </HStack>
        ))}
      </Stack>
      <Button
        onClick={() => mutate({ id: userId, args: form })}
        colorScheme="darkbrown"
      >
        {t("Update")}
      </Button>
    </div>
  ) : (
    <div className="w-full flex gap-8 flex-col">
      <SectionHeader sectionTitle={t("newsletter", "Newsletter")} />
      <div className="w-full flex flex-col gap-4">
        {newsLetterOptions.map((opt, i) => (
          <div className="flex justify-between w-full items-center" key={i}>
            <span className="font-semibold text-xl">
              <TranslationText translationObject={opt.name} />
            </span>
            <div className="flex gap-2">
              <Switch {...switchInputProps(opt.value as any)} />
              <span>{t("Push")}</span>
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
