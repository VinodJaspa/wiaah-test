import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiTicket } from "react-icons/hi";
import { SettingsSectionType } from "types";
import {
  AffiliationIcon,
  AffiliationManagementSection,
  ProductManagementSection,
  SectionsLayout,
  BookingsSection,
} from "ui";

export const ServiceManagementView = () => {
  const baseRoute = "service-management";
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section[0] : section;

  const { t } = useTranslation();

  function handleSectionChange(url: string) {
    router.replace(`/${baseRoute}/${url}`);
  }

  return (
    <SectionsLayout
      handleSectionChange={handleSectionChange}
      currentSectionName={route}
      sections={sections}
      handleRetrun={() => {
        router.replace(`/${baseRoute}`);
      }}
      name={t("service_management", "Service Management")}
    />
  );
};

const sections: SettingsSectionType[] = [
  {
    panelName: {
      translationKey: "bookings",
      fallbackText: "bookings",
    },
    panelIcon: HiTicket,
    panelUrl: "/bookings",
    panelComponent: <BookingsSection />,
  },
];
