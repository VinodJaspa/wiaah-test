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
import { MdVerified } from "react-icons/md";
import { BiData } from "react-icons/bi";
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
  SectionsLayout,
  AccountDeletionSection,
  AccountVerification,
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
      translationKey: "blocklist",
      fallbackText: "Blocklist",
    },
    panelIcon: ImBlocked,
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
  {
    panelName: {
      translationKey: "account_deletion",
      fallbackText: "Account Deletion",
    },
    panelIcon: IoTrash,
    panelUrl: "/account_deletion",
    panelComponent: <AccountDeletionSection />,
  },
  {
    panelName: {
      translationKey: "account_verification",
      fallbackText: "Account Verification",
    },
    panelIcon: MdVerified,
    panelUrl: "/account_verification",
    panelComponent: <AccountVerification />,
  },
  {
    panelName: {
      translationKey: "personalizarion_and_data",
      fallbackText: "Personalization and data",
    },
    panelIcon: BiData,
    panelUrl: "/personalizarion_and_data",
    panelComponent: <PersonalizationAndDataSection />,
  },
];
