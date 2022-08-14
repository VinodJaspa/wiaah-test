import React from "react";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  useGetServicesProviderQuery,
  useSearchFilters,
  Divider,
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  ServiceWorkingHoursSection,
  HotelServiceRoomsSection,
  PopularAmenitiesSection,
  ServicesProviderDescriptionSection,
  Reviews,
  SectionTabType,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  ServiceReservastion,
  SectionsScrollTabList,
  Accordion,
  Button,
} from "ui";
import { reviews } from "placeholder";
import { useResponsive } from "hooks";
import { useTranslation } from "react-i18next";

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
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.presintations || [] : []}
      />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper sidebar={ServiceReservastion}>
        {res ? (
          <>
            <ServicesProviderDescriptionSection
              description={res.data.description}
              name={res.data.name}
              proprtyType={res.data.proprtyType}
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
              <ServicePoliciesSection policies={res.data.policies} />
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
