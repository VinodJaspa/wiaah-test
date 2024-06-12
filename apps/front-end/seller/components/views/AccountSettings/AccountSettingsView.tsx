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
import { MdCardMembership } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { BiData } from "react-icons/bi";
import { SettingsSectionType } from "types";
import {
  AccountSettingsSection,
  BlocklistSection,
  FindYourFriendsStep,
  MembershipSection,
  AccountNewsLetterSettingsSection,
  NotificationsSettingsSection,
  PasswordSection,
  PrivacySection,
  SectionsLayout,
  AccountDeletionSection,
  PersonalizationAndDataSection,
  Verified,
  ShareIcon,
  MyVerificationSection,
  ShareYourWiaahQr,
  VatIcon,
  VatSection,
  MyProfileStatistics,
  useGetMyProfileQuery,
} from "ui";
import { ImBlocked, ImProfile } from "react-icons/im";
import { useResponsive } from "hooks";

export const AccountSettingsView: React.FC = () => {
  const baseRoute = "management/account-settings";
  const router = useRouter();
  const { section } = router.query;
  const { isMobile } = useResponsive();
  const route = Array.isArray(section) ? section[0] : section;

  React.useEffect(() => {
    if (!route && !isMobile) {
      router.push(`/${baseRoute}/${sections[0].panelUrl}`);
    }
  }, [router, route]);

  function handleSectionChange(url: string) {
    router.replace(`/${baseRoute}/${url}`);
  }

  return (
    <>
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
    </>
  );
};

// export const NotFoundSection = () => {
//   return <div>not found</div>;
// };

export const MyAccountNotificationSettings = () => {
  // const { data } = useGetMyProfileQuery();
  const data = {
    ownerId: "33",
  };

  return data ? <NotificationsSettingsSection accountId={"33"} /> : null;
};

export const MyAccountSettingsSection = () => {
  // this graphql query endpoint is not ready yet so use placeholders instead till the server get ready
  // const { data } = useGetMyProfileQuery();
  const data = {
    ownerId: "33",
  };

  return data ? <AccountSettingsSection accountId={data.ownerId} /> : null;
};

export const MyVatSection = () => {
  // Warning: this graphql query endpoint is important but it's not ready yet so I use placeholder data onece it's ready replace the placehoder with it
  // const { data } = useGetMyProfileQuery();
  const data = {
    ownerId: "33",
  };

  return data ? <VatSection accountId={data.ownerId} /> : null;
};

export const MyNewsletterSettingsSection = () => {
  // Warning: this graphql query endpoint is important but it's not ready yet so I use placeholder data onece it's ready replace the placehoder with it
  // const { data } = useGetMyProfileQuery();

  const data = {
    ownerId: "33",
  };

  return data ? (
    <AccountNewsLetterSettingsSection userId={data.ownerId} />
  ) : null;
};

const sections: SettingsSectionType[] = [
  {
    panelName: "Account",
    panelIcon: FiSettings,
    panelUrl: "/account",

    panelComponent: <MyAccountSettingsSection />,
  },
  {
    panelName: "Password",
    panelIcon: BiKey,
    panelUrl: "/password",

    panelComponent: <PasswordSection />,
  },
  {
    panelName: "My Verification",
    panelIcon: <Verified />,
    panelUrl: "/my-verification",

    panelComponent: <MyVerificationSection />,
  },
  {
    panelName: "Notification",
    panelIcon: IoNotificationsOutline,
    panelUrl: "/notifications",

    panelComponent: <MyAccountNotificationSettings />,
  },
  {
    panelName: "My Profile Statistics",
    panelIcon: ImProfile,
    panelUrl: "/my-profile-statistics",

    panelComponent: <MyProfileStatistics />,
  },
  {
    panelName: "Newsletter",
    panelIcon: IoNewspaperOutline,
    panelUrl: "/newsletter",

    panelComponent: <MyNewsletterSettingsSection />,
  },
  {
    panelName: "Share Your Wiaah Qr",
    panelIcon: ShareIcon,
    panelUrl: "/shareyourqr",
    panelComponent: <ShareYourWiaahQr />,
  },
  {
    panelName: "Invite Friends",
    panelIcon: HiUserGroup,
    panelUrl: "/invitefriends",
    panelComponent: <FindYourFriendsStep onSuccess={() => { }} />,
  },
  {
    panelName: "Your Membership",
    panelIcon: MdCardMembership,
    panelUrl: "/membership",
    panelComponent: <MembershipSection />,
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
  {
    panelName: "Personalization and data",
    panelIcon: BiData,
    panelUrl: "/personalizarion_and_data",
    panelComponent: <PersonalizationAndDataSection />,
  },
  {
    panelName: "Vat settings",
    panelIcon: VatIcon,
    panelUrl: "/vat",
    panelComponent: <MyVatSection />,
  },
];
