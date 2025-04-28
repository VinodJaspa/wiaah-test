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
  useResponsive,
  Stack,
  Divider,
  HStack,
} from "@UI";
import { useForm } from "@UI/../utils/src";
import { PrivacySettings } from "@features/API";

export interface PrivacySectionProps {}

export const PrivacySection: React.FC<PrivacySectionProps> = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const { data: settings } = useGetMySocialPrivacySettings();
  const { switchInputProps } = useForm<Parameters<typeof updateSettings>[0]>({
    ...settings,
  });
  const { mutate: updateSettings } = useUpdateMyPrivacySettings();
  const { isMobile } = useResponsive();

  const privacySectionOpts: FormOptionType<keyof PrivacySettings>[] = [
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

  return isMobile ? (
    <div className="flex flex-col gap-6 p-2">
      <SectionHeader sectionTitle={t("Privacy")} />

      <Stack className="p-4" col divider={<Divider />}>
        {privacySectionOpts.map((opt, i) => (
          <HStack className="justify-between py-2">
            <TranslationText className="" translationObject={opt.name} />
            <Switch variant="alt" {...switchInputProps(opt.value as any)} />
          </HStack>
        ))}
      </Stack>
    </div>
  ) : (
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
