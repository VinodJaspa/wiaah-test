import React from "react";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  useGetServicesProviderQuery,
  useSearchFilters,
  Divider,
  SectionsScrollTabList,
  Accordion,
  Button,
  HotelServiceRoomsSection,
  PopularAmenitiesSection,
  Reviews,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  ServicePresentationCarosuel,
  ServiceReachOutSection,
  ServiceReservastion,
  ServicesProviderDescriptionSection,
  ServiceWorkingHoursSection,
  StaticSideBarWrapper,
  SectionTabType,
  HotelMarketDescriptionSection,
} from "ui";
import { reviews } from "placeholder";
import { useResponsive } from "hooks";
import { useTranslation } from "react-i18next";
import { isError } from "react-query";

export const HotelDetailsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const { isMobile } = useResponsive();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.presintations || [] : []}
      />
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper sidebar={ServiceReservastion}>
        {res ? (
          <>
            <HotelMarketDescriptionSection
              description={res.data.description}
              name={res.data.name}
              proprtyType={t("Hotel")}
            />
            <Divider />
            <Accordion>
              <PopularAmenitiesSection
                cols={2}
                amenities={res.data.PopularAmenities || []}
              />
              <Divider />
              <ServiceReachOutSection
                email={res.data.email}
                location={res.data.location}
                telephone={res.data.telephone}
              />
              <HotelServiceRoomsSection rooms={res.data.rooms} />
              <ServiceWorkingHoursSection workingDays={res.data.workingDays} />
              <ServicePoliciesSection
                deposit={res.data.deposit}
                title={t("Hotel Polices")}
                policies={res.data.policies}
              />
              <ServiceOnMapLocalizationSection location={res.data.location} />
            </Accordion>
          </>
        ) : null}
        <Reviews id={res?.data.id || ""} reviews={reviews} />
      </StaticSideBarWrapper>
    </div>
  );
};

const ServicesProviderTabs: SectionTabType[] = [
  {
    slug: "description",
    name: "Description",
  },
  {
    name: "Contact",
    slug: "contact",
  },
  {
    slug: "policies",
    name: "Policies",
  },
  {
    name: "Working hours",
    slug: "workingHours",
  },
  {
    slug: "rooms",
    name: "Rooms",
  },
  {
    slug: "localization",
    name: "Localization",
  },
  {
    slug: "reviews",
    name: "Customer reviews",
  },
];
