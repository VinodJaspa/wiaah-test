import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiKey } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { AccountSettingsPanel } from "types";
import { AccountSettingsSection, PasswordSection } from "ui";
import { getRouteAfter } from "ui/components/helpers";
import { AccountSettingsLeftPanel } from "./AccountSettingsLeftPanel";
import { AccountSettingsRightPanel } from "./AccountSettingsRightPanel";

const settings: AccountSettingsPanel[] = [
  {
    panelName: {
      fallbackText: "Account",
      translationKey: "account",
    },
    panelIcon: FiSettings,
    panelUrl: "/account",
    // panelDescription: {
    //   translationKey: "settings_account_description",
    //   fallbackText:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    // },
    panelComponent: <AccountSettingsSection />,
  },
  {
    panelName: {
      fallbackText: "Password",
      translationKey: "password",
    },
    panelIcon: BiKey,
    panelUrl: "/password",
    // panelDescription: {
    //   translationKey: "settings_password_description",
    //   fallbackText:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    // },
    panelComponent: <PasswordSection />,
  },
  {
    panelName: {
      fallbackText: "Notification",
      translationKey: "notification",
    },
    panelIcon: IoNotificationsOutline,
    panelUrl: "/notifications",
    // panelDescription: {
    //   translationKey: "settings_notifications_description",
    //   fallbackText: "Lorem Ipsum is simply dummy text",
    // },
    panelComponent: <Text>notifications</Text>,
  },
];

export const AccountSettingsView: React.FC = () => {
  const baseRoute = "settings";
  const { t } = useTranslation();
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section[0] : section;

  const sectionIdx = settings.findIndex(
    (panel) => panel.panelUrl === `/${route}`
  );

  const CurrentSection = (): React.ReactElement => {
    if (sectionIdx > -1) {
      return settings[sectionIdx].panelComponent;
    } else {
      return NotFoundSection();
    }
  };

  return (
    <Flex direction={"column"} gap="1rem" w="100%">
      <Text px="1rem" fontSize={"xl"} fontWeight="bold">
        {t("settings", "Settings")}
      </Text>
      <Flex>
        <AccountSettingsLeftPanel
          currentActive={settings[sectionIdx].panelUrl}
          onPanelClick={(url) =>
            router.replace(`/${baseRoute}${url}`, null, {
              shallow: true,
            })
          }
          panelsInfo={settings}
          innerProps={{
            w: "30%",
          }}
        />
        <AccountSettingsRightPanel>
          {CurrentSection()}
        </AccountSettingsRightPanel>
      </Flex>
    </Flex>
  );
};

export const NotFoundSection = () => {
  return <div>not found</div>;
};
