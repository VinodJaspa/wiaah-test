import { Switch } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType } from "types";
import { TranslationText } from "ui";

export interface PrivacySectionProps {}

export const PrivacySection: React.FC<PrivacySectionProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full gap-8">
      <h1 className="text-4xl w-full font-bold">{t("privacy", "Privacy")}</h1>
      <div className="flex w-full flex-col gap-4">
        {privacySectionOpts.map((opt, i) => (
          <div className="w-full flex justify-between">
            <TranslationText className="" translationObject={opt.name} />
            <div className="flex gap-2 items-center">
              <Switch colorScheme={"primary"} />
              <p>{t("push", "Push")}</p>
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
