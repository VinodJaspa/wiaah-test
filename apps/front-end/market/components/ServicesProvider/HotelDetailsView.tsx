import React from "react";
import {
  SpinnerFallback,
  useGetServicesProviderQuery,
  Divider,
  SectionsScrollTabList,
  Accordion,
  HotelServiceRoomsSection,
  PopularAmenitiesSection,
  Reviews,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  ServicePresentationCarosuel,
  ServiceReachOutSection,
  ServiceReservastion,
  MarketServicesProviderHeader,
  ServiceWorkingHoursSection,
  StaticSideBarWrapper,
  SectionTabType,
  HotelMarketDescriptionSection,
} from "ui";
import { reviews } from "placeholder";
import { useResponsive } from "hooks";
import { useTranslation } from "react-i18next";

export const HotelDetailsView: React.FC<{ id: string }> = ({ id }) => {
  const { isMobile } = useResponsive();
  const { data: res, isError, isLoading } = useGetServicesProviderQuery(id);
  const { t } = useTranslation();
  console.log({ res });
  const rating =
    res?.data?.getHotelService?.rooms.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0) || 0;

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      {res ? (
        <MarketServicesProviderHeader
          name={res.data.getHotelService.owner.firstName}
          rating={rating / res.data.getHotelService.rooms.length}
          reviewsCount={res.data.getHotelService.rooms.reduce(
            (acc, curr) => acc + curr.reviews,
            0
          )}
          thumbnail={res.data.getHotelService.owner.photo}
        />
      ) : null}
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.getHotelService.presentations || [] : []}
      />
      <SpinnerFallback isLoading={isLoading} isError={isError} />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper sidebar={ServiceReservastion}>
        {res ? (
          <>
            <HotelMarketDescriptionSection
              description={res.data.getHotelService.serviceMetaInfo.description}
              name={res.data.getHotelService.serviceMetaInfo.title}
              proprtyType={t("Hotel")}
            />
            <Divider />
            <Accordion>
              <PopularAmenitiesSection
                cols={2}
                amenities={
                  res?.data?.getHotelService?.rooms[0]?.popularAmenities.map(
                    ({ label, value }) => ({ name: label, slug: value })
                  ) || []
                }
              />
              <Divider />
              <ServiceReachOutSection
                email={res.data.getHotelService.contact.email}
                location={res.data.getHotelService.location}
                telephone={res.data.getHotelService.contact.phone}
              />
              <HotelServiceRoomsSection
                rooms={res.data.getHotelService.rooms}
              />
              {res.data.getHotelService.workingHours ? (
                <ServiceWorkingHoursSection
                  workingHours={res.data.getHotelService.workingHours}
                />
              ) : null}
              <ServicePoliciesSection
                title={t("Hotel Polices")}
                policies={res.data.getHotelService.policies}
              />
              <ServiceOnMapLocalizationSection
                location={res.data.getHotelService.location}
              />
            </Accordion>
          </>
        ) : null}
        <Reviews id={res?.data.getHotelService.id || ""} reviews={reviews} />
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
