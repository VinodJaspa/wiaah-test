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
  Verified,
  ShareIcon,
  MyVerificationSection,
  ShareYourWiaahQr,
  VatIcon,
  VatSection,
} from "ui";
import { ImBlocked } from "react-icons/im";
import { useResponsive } from "hooks";
import { useTranslation } from "react-i18next";
import { IoMdReturnLeft } from "react-icons/io";
import { useRouting } from "routing";

export const AccountSettingsView: React.FC = () => {
  const baseRoute = "management/account-settings";
  const { t } = useTranslation();
  const { visit } = useRouting();
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
      <div
        onClick={() => visit((r) => r.management())}
        className="px-6 cursor-pointer w-fit text-xl py-2 my-2 flex gap-4 items-center"
      >
        <IoMdReturnLeft />
        <p>{t("Return")}</p>
      </div>
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
    panelName: "My Verification",
    panelIcon: <Verified />,
    panelUrl: "/my-verification",

    panelComponent: <MyVerificationSection />,
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
    panelName: "Share Your Wiaah Qr",
    panelIcon: ShareIcon,
    panelUrl: "/shareyourqr",
    panelComponent: <ShareYourWiaahQr />,
  },
  {
    panelName: "Invite Friends",
    panelIcon: HiUserGroup,
    panelUrl: "/invitefriends",
    panelComponent: <FindYourFriendsStep />,
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
    panelName: "Account Verification",
    panelIcon: MdVerified,
    panelUrl: "/account_verification",
    panelComponent: <AccountVerification />,
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
    panelComponent: <VatSection />,
  },
];
