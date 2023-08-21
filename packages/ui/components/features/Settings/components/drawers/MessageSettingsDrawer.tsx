import { useSocialControls } from "@blocks";
import { MessagingSettings } from "@features/API";
import {
  useGetMySocialPrivacySettings,
  useUpdateMyPrivacySettings,
} from "@features/Social";
import {
  Drawer,
  DrawerContent,
  ExclamationCircleIcon,
  HStack,
  Radio,
  Switch,
} from "@partials";
import { SectionHeader } from "@sections/ShoppingManagement";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, setTestid, useForm } from "utils";

export const MessageSettingsDrawer: React.FC = () => {
  const { value, hideMessageSettings } = useSocialControls(
    "showMessageSettings"
  );
  useGetMySocialPrivacySettings({
    onSuccess: (data) => setInitialData(data),
  });
  const { mutate } = useUpdateMyPrivacySettings();
  const { setInitialData, radioInputProps, form, switchInputProps } = useForm<
    Parameters<typeof mutate>[0]
  >(
    {},
    {},
    {
      onChange(data) {
        mutate(data);
      },
    }
  );
  const { t } = useTranslation();
  const isOpen = value === true;

  const options: {
    title: string;
    description: string;
    value: MessagingSettings;
  }[] = [
    {
      title: t("Everybody"),
      description: t("Each user can send you messages"),
      value: MessagingSettings.All,
    },
    {
      title: t("User that you follow back"),
      description: t("Each user you follow can send you messages"),
      value: MessagingSettings.Follow,
    },
    {
      title: t("No One"),
      description: t("No one can send you messages"),
      value: MessagingSettings.Off,
    },
  ];

  return (
    <Drawer
      onClose={hideMessageSettings}
      full
      position="bottom"
      isOpen={isOpen}
    >
      <DrawerContent>
        <SectionHeader sectionTitle={t("Message Settings")} />
        <div className="flex w-full flex-col gap-8">
          {mapArray(options, (opt) => (
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <p className="text-semibold">{opt.title}</p>
                <HStack>
                  <ExclamationCircleIcon />
                  <p className="text-sm text-grayText">{opt.description}</p>
                </HStack>
              </div>
              <Radio
                {...setTestid(`initialMessaging-${opt.value}`)}
                name="messageSettings"
                {...radioInputProps("initialMessaging", opt.value)}
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <HStack className="justify-between items-center">
              <p className="text-semibold">{t("Read Status")}</p>
              <Switch
                {...setTestid("MessageReadStatus")}
                {...switchInputProps("messageReadStatus")}
              />
            </HStack>
            <p className="text-grayText text-sm">
              {t(
                "If you disable it, you could not know if people read your messages, and people also could not know if you read their messages"
              )}
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
