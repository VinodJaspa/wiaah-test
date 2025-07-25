import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiTime } from "react-icons/bi";
import { HiTicket } from "react-icons/hi";
import { MdPending } from "react-icons/md";
import { RiBookLine, RiServiceFill } from "react-icons/ri";
import { FiClock } from 'react-icons/fi';
import { getRouting } from "routing";
import { SlCalender } from "react-icons/sl";
import { SettingsSectionType } from "types";
import { CiBookmark } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import {
  SectionsLayout,
  BookingsSection,
  BookingsHistory,
  PendingAppointmentsSection,
  MyServicesSection,
  TimeManagementSection,
  ImageIcon,
  EditServicePresentationSection,
  ServicesIcon,
  
} from "@UI/components";
import ReseravtionAgendaSectionMainPage from "@sections/ServiceManagement/Reservation/ReservationAgenda/ReservationAgendaSectionMain";
import ResarvationSectionMainPage from "@sections/ServiceManagement/Reservation/ReservationList/ReservationSection";
import PendingReservationsSectionMain from "@sections/ServiceManagement/PendingReservation/PendingReservation";
import ServiceCatalogSectionMain from "@sections/ServiceManagement/ServiceCatalog/ServiceCatalogMain";


export const ServiceManagementView = () => {
  const baseRoute = getRouting((r) => r.visitServiceManagement());
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
    panelName: "Reservation Agenda",
    panelIcon: SlCalender({}),
    panelUrl: "/reservation-agenda",
    panelComponent: <ReseravtionAgendaSectionMainPage />,
    subSections: [],
  },
  {
    panelName: "Reservations",
    panelIcon: CiBookmark({}),
    panelUrl: "/reservation-list",
    panelComponent: <ResarvationSectionMainPage/>,
    subSections: [],
  },
 
  {
    panelName: "Pending Reservations ",
    panelIcon: FiClock({}),
    panelUrl: "/pending-reservations",
    panelComponent: <PendingReservationsSectionMain />,
    subSections: [],
  },
  {
    panelName: "Service Setup",
    panelIcon: CiSettings({}),
    panelUrl: "/service-setup",
    panelComponent: <ServiceCatalogSectionMain />,
    subSections: [
      {
        key: "edit",
        sections: [
          {
            panelIcon: ServicesIcon({}),
            panelComponent: <ServiceCatalogSectionMain/>,
            panelName: "Service",
            panelUrl: "/my-service",
          },
          {
            panelName: "Presentation",
            panelIcon: ImageIcon({}),
            panelUrl: "/presentation",
            panelComponent: <EditServicePresentationSection />,
          },
        ],
      },
    ],
  },
  {
    panelName: "Opening time management",
    panelIcon: BiTime({}),
    panelUrl: "/opening-time-management",
    panelComponent: <TimeManagementSection />,
    subSections: [],
  },
];
