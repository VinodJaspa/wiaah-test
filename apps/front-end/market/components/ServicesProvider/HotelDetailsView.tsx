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
import { PresentationType } from "@features/API";

export const HotelDetailsView: React.FC<{ id: string }> = ({ id }) => {
  const { isMobile } = useResponsive();
  const { data: res, isError, isLoading } = useGetShopDetailsQuery(id);
  const { data } = useGetShopServicesQuery({
    ids: [],
    sellerId: res?.ownerId || "",
  });
  const { t } = useTranslation();
  console.log({ res });
  const rating = res?.rating;

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
                type: PresentationType.Image,
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
              <PopularAmenitiesSection
                cols={2}
                amenities={
                  // res?.data?.getHotelService?.rooms[0]?.popularAmenities.map(
                  // ({ label, value }) => ({ name: label, slug: value })
                  // ) || []
                  []
                }
              />
              <Divider />
              <ServiceReachOutSection
                email={res.email}
                location={res.location}
                telephone={res.phone}
              />
              <HotelServiceRoomsSection rooms={data} />
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
