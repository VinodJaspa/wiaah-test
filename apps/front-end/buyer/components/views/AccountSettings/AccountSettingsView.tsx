import { useRouter } from "next/router";
import React from "react";
import { BiKey } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import {
  IoNotificationsOutline,
  IoNewspaperOutline,
  IoTrash,
} from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { BiData } from "react-icons/bi";
import { SettingsSectionType } from "types";
import {
  AccountSettingsSection,
  BlocklistSection,
  FindYourFriendsStep,
  NewsLetterSection,
  NotificationsSettingsSection,
  PasswordSection,
  PrivacySection,
  SectionsLayout,
  AccountDeletionSection,
  PersonalizationAndDataSection,
} from "ui";
import { ImBlocked } from "react-icons/im";

export const AccountSettingsView: React.FC = () => {
  const baseRoute = "settings";
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section[0] : section;

  React.useEffect(() => {
    if (!route) {
      // router.push(`/${baseRoute}/${sections[0].panelUrl}`);
    }
  }, [router, route]);

  function handleSectionChange(url: string) {
    router.replace(`/${baseRoute}/${url}`);
  }
  return (
    <SectionsLayout
      name={{
        translationKey: "account_settings",
        fallbackText: "Account Settings",
      }}
      handleRetrun={() => {
        router.push(`/${baseRoute}`, null, { shallow: true });
      }}
      currentSectionName={route}
      sections={sections}
      handleSectionChange={handleSectionChange}
    />
  );
};

export const NotFoundSection = () => {
  return <div>not found</div>;
};

const sections: SettingsSectionType[] = [
  {
    panelName: "Account",
    panelIcon: FiSettings,
    panelUrl: "/account",

    panelComponent: <AccountSettingsSection />,
  },
  {
    panelName: "Password",
    panelIcon: BiKey,
    panelUrl: "/password",

    panelComponent: <PasswordSection />,
  },
  {
    panelName: "Notification",
    panelIcon: IoNotificationsOutline,
    panelUrl: "/notifications",

    panelComponent: <NotificationsSettingsSection />,
  },
  {
    panelName: "Newsletter",
    panelIcon: IoNewspaperOutline,
    panelUrl: "/newsletter",

    panelComponent: <NewsLetterSection />,
  },
  {
    panelName: "Invite Friends",
    panelIcon: HiUserGroup,
    panelUrl: "/invitefriends",
    panelComponent: <FindYourFriendsStep />,
  },
  {
    panelName: "Blocklist",
    panelIcon: ImBlocked,
    panelUrl: "/blocklist",
    panelComponent: <BlocklistSection />,
  },
  {
    panelName: "Privacy",
    panelIcon: BiLock,
    panelUrl: "/privacy",
    panelComponent: <PrivacySection />,
  },
  {
    panelName: "Account Deletion",
    panelIcon: IoTrash,
    panelUrl: "/account_deletion",
    panelComponent: <AccountDeletionSection />,
  },
  // {
  //   panelName: "Account Verification",
  //   panelIcon: MdVerified,
  //   panelUrl: "/account_verification",
  //   panelComponent: <AccountVerification />,
  // },
  {
    panelName: "Personalization and data",
    panelIcon: BiData,
    panelUrl: "/personalizarion_and_data",
    panelComponent: <PersonalizationAndDataSection />,
  },
];
