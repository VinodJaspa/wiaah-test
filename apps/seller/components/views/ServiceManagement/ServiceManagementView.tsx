import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaServicestack } from "react-icons/fa";
import { FcServices } from "react-icons/fc";
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
      translationKey: "my_rendez_vous",
      fallbackText: "My rendez-vous",
    },
    panelIcon: HiTicket,
    panelUrl: "/my-rendez-vous",
    panelComponent: <BookingsSection />,
  },
  {
    panelName: {
      translationKey: "bookings",
      fallbackText: "Bookings",
    },
    panelIcon: RiBookLine,
    panelUrl: "/bookings",
    panelComponent: <BookingsHistory />,
  },
  {
    panelName: {
      translationKey: "pending_appointments",
      fallbackText: "Pending Appointments",
    },
    panelIcon: MdPending,
    panelUrl: "/pending-appointments",
    panelComponent: <PendingAppointmentsSection />,
  },
  {
    panelName: {
      translationKey: "my_services",
      fallbackText: "My Service",
    },
    panelIcon: RiServiceFill,
    panelUrl: "/my-service",
    panelComponent: <MyServicesSection />,
  },
];
