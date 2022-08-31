import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiTime } from "react-icons/bi";
import { FaBed } from "react-icons/fa";
import { HiTicket } from "react-icons/hi";
import { MdPending } from "react-icons/md";
import { RiBookLine, RiServiceFill } from "react-icons/ri";
import { SettingsSectionType } from "types";
import {
  SectionsLayout,
  BookingsSection,
  BookingsHistory,
  PendingAppointmentsSection,
  MyServicesSection,
  TimeManagementSection,
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
      name={t("Service Management")}
    />
  );
};

const sections: SettingsSectionType[] = [
  {
    panelName: "My rendez-vous",
    panelIcon: HiTicket,
    panelUrl: "/my-rendez-vous",
    panelComponent: <BookingsSection />,
    subSections: [],
  },
  {
    panelName: "Bookings",
    panelIcon: RiBookLine,
    panelUrl: "/bookings",
    panelComponent: <BookingsHistory />,
    subSections: [],
  },
  {
    panelName: "Pending Appointments",
    panelIcon: MdPending,
    panelUrl: "/pending-appointments",
    panelComponent: <PendingAppointmentsSection />,
    subSections: [],
  },
  {
    panelName: "My Service",
    panelIcon: RiServiceFill,
    panelUrl: "/my-service",
    panelComponent: <MyServicesSection />,
    subSections: [],
  },
  {
    panelName: "Opening time management",
    panelIcon: BiTime,
    panelUrl: "/opening-time-management",
    panelComponent: <TimeManagementSection />,
    subSections: [],
  },
];
