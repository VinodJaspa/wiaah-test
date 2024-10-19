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
  MarketServicesProviderHeader,
  ServiceWorkingHoursSection,
  StaticSideBarWrapper,
  SectionTabType,
  HotelMarketDescriptionSection,
  useGetShopDetailsQuery,
  useGetShopServicesQuery,
  ServiceReservastionForm,
} from "ui";
import { reviews } from "placeholder";
import { useResponsive } from "hooks";
import { useTranslation } from "react-i18next";
import { PresentationType, ServicePresentationType } from "../../features/API";

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

export const HotelDetailsView: React.FC<{ id: string }> = ({ id }) => {
  const { isMobile } = useResponsive();
  const { data: res, isError, isLoading } = useGetShopDetailsQuery(id);
  const { data } = useGetServicesProviderQuery(res?.ownerId || "");
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      {res ? (
        <MarketServicesProviderHeader
          name={res.sellerProfile.username}
          rating={res.rating}
          reviewsCount={res.reviews}
          thumbnail={res.sellerProfile.photo}
        />
      ) : null}
      <Divider />
      <ServicePresentationCarosuel
        data={
          res
            ? res.images.map((v) => ({
              src: v,
              type: ServicePresentationType.Img,
            })) || []
            : []
        }
      />
      <SpinnerFallback isLoading={isLoading} isError={isError} />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={
          <ServiceReservastionForm
            sellerId={res?.ownerId! || ""}
            selectedServicesIds={[]}
          />
        }
      >
        {res ? (
          <>
            <HotelMarketDescriptionSection
              description={res.description}
              name={res.name}
              proprtyType={t("Hotel")}
            />
            <Divider />
            <Accordion>
              {/* TODO: It should go inside RoomCardDetails */}
              {/* <PopularAmenitiesSection
                cols={2}
                amenities={data?.rooms[0].includedAmenities || []}
              /> */}
              <Divider />
              <ServiceReachOutSection
                email={res.email}
                location={res.location}
                telephone={res.phone}
              />
              <HotelServiceRoomsSection rooms={data.rooms} />
              {res.workingSchedule.weekdays ? (
                <ServiceWorkingHoursSection
                  workingHours={res.workingSchedule}
                />
              ) : null}
              <ServicePoliciesSection
                title={t("Hotel Polices")}
                policies={[]}
              />
              <ServiceOnMapLocalizationSection location={res.location} />
            </Accordion>
          </>
        ) : null}
        <Reviews id={res?.ownerId || ""} reviews={reviews} />
      </StaticSideBarWrapper>
    </div>
  );
};
