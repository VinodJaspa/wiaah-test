import { PrivacyPolicy } from "@UI/views";
import { SectionsLayout } from "@blocks";
import { BellOutlineIcon } from "@partials";
import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { MdOutlinePolicy } from "react-icons/md";
import { useRouting } from "routing";
import { SettingsSectionType } from "types";
import { MySiteLanguage } from "./SiteLanguage";

export const MySiteSettingsView: React.FC<{}> = () => {
  const { t } = useTranslation();

  const sections: SettingsSectionType[] = [
    {
      panelName: t("Wiaah alert"),
      panelComponent: <></>,
      panelUrl: "/alert",
      panelIcon: <BellOutlineIcon />,
    },
    {
      panelName: t("Information"),
      panelComponent: <></>,
      panelIcon: <BiInfoCircle />,
      panelUrl: "/information",
      subSections: [
        {
          key: "infos-subsections",
          sections: [
            {
              panelName: t("About Wiaah"),
              panelComponent: <></>,
              panelIcon: <HiOutlineQuestionMarkCircle />,
              panelUrl: "/about-us",
            },
            {
              panelName: t("Privacy Policy"),
              panelComponent: <PrivacyPolicy />,
              panelIcon: <MdOutlinePolicy />,
              panelUrl: "privacy-policy",
            },
            {
              panelName: t("Terms and Conditions"),
              panelComponent: <></>,
              panelIcon: <MdOutlinePolicy />,
              panelUrl: "/terms-and-conditions",
            },
          ],
        },
      ],
    },
    {
      panelName: t("Customer Service"),
      panelComponent: <></>,
      panelIcon: <></>,
      panelUrl: "/customer-service",
    },
    {
      panelName: t("Stay connected"),
      panelComponent: <></>,
      panelIcon: <></>,
      panelUrl: "/follow-us",
    },
    {
      panelName: t("Language"),
      panelComponent: <MySiteLanguage />,
      panelIcon: <></>,
      panelUrl: "/language",
    },
  ];

  const baseRoute = "/site-settings";
  const { push, replace, getQuery } = useRouting();
  const { section } = getQuery();
  const { isMobile } = useResponsive();
  const route = Array.isArray(section) ? section[0] : section;

  React.useEffect(() => {
    if (!route && !isMobile) {
      push(`/${baseRoute}/${sections[0].panelUrl}`);
    }
  }, [route]);

  function handleSectionChange(url: string) {
    replace(`/${baseRoute}/${url}`);
  }

  return (
    <>
      <SectionsLayout
        name={{
          translationKey: "account_settings",
          fallbackText: "Account Settings",
        }}
        handleRetrun={() => {
          push(`/${baseRoute}`);
        }}
        currentSectionName={route}
        sections={sections}
        handleSectionChange={handleSectionChange}
      />
    </>
  );
};
