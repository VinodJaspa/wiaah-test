import { Flex, Text, useDimensions } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiKey } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoNotificationsOutline, IoNewspaperOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { MdCardMembership } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { SettingsSectionType } from "types";
import {
  AccountSettingsSection,
  BlocklistSection,
  FindYourFriendsStep,
  MembershipSection,
  NewsLetterSection,
  NotificationsSettingsSection,
  PasswordSection,
  PrivacySection,
  useResponsive,
  SettingsSectionsSidebar,
} from "ui";

const settings: SettingsSectionType[] = [
  {
    panelName: {
      fallbackText: "Account",
      translationKey: "account",
    },
    panelIcon: FiSettings,
    panelUrl: "/account",

    panelComponent: <AccountSettingsSection />,
  },
  {
    panelName: {
      fallbackText: "Password",
      translationKey: "password",
    },
    panelIcon: BiKey,
    panelUrl: "/password",

    panelComponent: <PasswordSection />,
  },
  {
    panelName: {
      fallbackText: "Notification",
      translationKey: "notification",
    },
    panelIcon: IoNotificationsOutline,
    panelUrl: "/notifications",

    panelComponent: <NotificationsSettingsSection />,
  },
  {
    panelName: {
      fallbackText: "Newsletter",
      translationKey: "newsletter",
    },
    panelIcon: IoNewspaperOutline,
    panelUrl: "/newsletter",

    panelComponent: <NewsLetterSection />,
  },
  {
    panelName: {
      fallbackText: "Invite Friends",
      translationKey: "invite_friends",
    },
    panelIcon: HiUserGroup,
    panelUrl: "/invitefriends",
    panelComponent: <FindYourFriendsStep />,
  },
  {
    panelName: {
      fallbackText: "Your Membership",
      translationKey: "your_membership",
    },
    panelIcon: MdCardMembership,
    panelUrl: "/membership",
    panelComponent: <MembershipSection />,
  },
  {
    panelName: {
      translationKey: "blocklist",
      fallbackText: "Blocklist",
    },
    panelIcon: BiLock,
    panelUrl: "/blocklist",
    panelComponent: <BlocklistSection />,
  },
  {
    panelName: {
      translationKey: "privacy",
      fallbackText: "Privacy",
    },
    panelIcon: BiLock,
    panelUrl: "/privacy",
    panelComponent: <PrivacySection />,
  },
];

export const AccountSettingsView: React.FC = () => {
  const baseRoute = "settings";
  const { t } = useTranslation();
  const router = useRouter();
  const { isTablet } = useResponsive();
  const { section } = router.query;
  const minGap = isTablet ? 0 : 48;

  const leftPanelRef = React.useRef<HTMLDivElement>(null);

  const leftPanelDims = useDimensions(leftPanelRef, true);

  const leftPanelwidth = leftPanelDims ? leftPanelDims.borderBox.width : null;

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
    <Flex h="100%" w="100%" justify={"end"} gap="2rem">
      <div className="fixed left-[5rem]" ref={leftPanelRef}>
        {!isTablet && (
          <Flex
            w={{ base: "100%", sm: "10rem", md: "15rem", lg: "20rem" }}
            direction={"column"}
            gap="1rem"
          >
            <Text px="1rem" fontSize={"xl"} fontWeight="bold">
              {t("settings", "Settings")}
            </Text>
            {settings[sectionIdx] && (
              <SettingsSectionsSidebar
                currentActive={settings[sectionIdx].panelUrl}
                onPanelClick={(url) =>
                  router.replace(`/${baseRoute}${url}`, null, {
                    shallow: true,
                  })
                }
                panelsInfo={settings}
                innerProps={{
                  w: "100%",
                }}
              />
            )}
          </Flex>
        )}
      </div>
      <Flex
        w={`calc(100% - ${leftPanelwidth + minGap}px)`}
        pr={`${minGap}px`}
        h="full"
      >
        <>{CurrentSection()}</>
      </Flex>
    </Flex>
  );
};

export const NotFoundSection = () => {
  return <div>not found</div>;
};
