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
  GetShopDetailsQuery,
  ServiceReservastionForm,
  GetServiceDetailsQuery,
} from "ui";
import { getRandomImage, reviews } from "placeholder";
import { useResponsive } from "hooks";
import { useTranslation } from "react-i18next";
import {
  BusinessType,
  PresentationType,
  ServicePresentationType,
  ServiceType,
  ServiceTypeOfSeller,
  StoreType,
  StoryType,
} from "@features/API";

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

export const MarketHotelDetailsView: React.FC<{ id: string }> = ({ id }) => {
  const { isMobile } = useResponsive();

  const res = FAKE_SHOP_DETAILS;
  const { data: _data } = useGetServicesProviderQuery(res?.ownerId || "");
  const {
    data: _res,
    isError,
    isLoading: _isLoading,
  } = useGetShopDetailsQuery(id);
  const data = FAKE_DATA;
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
      <SpinnerFallback isLoading={false} isError={isError} />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={
          <div className="w-full h-full mt-4">
            <ServiceReservastionForm
              sellerId={res?.ownerId! || ""}
              selectedServicesIds={[]}
            />
          </div>
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
              <HotelServiceRoomsSection rooms={data?.rooms ?? []} />
              {res?.workingSchedule?.weekdays ? (
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

const FAKE_DATA: GetServiceDetailsQuery["getServiceDetails"] = {
  createdAt: "2023-03-06T00:00:00Z",
  id: "12345",
  ownerId: "67890",
  cuisinesTypeId: "543",
  establishmentTypeId: "423",
  highest_price: 500,
  lowest_price: 100,
  michelin_guide_stars: 3,
  payment_methods: [],
  setting_and_ambianceId: "44",
  type_of_seller: ServiceTypeOfSeller.Individual,

  policies: [
    {
      policyTitle: "Cancellation Policy",
      terms: ["Full refund if canceled within 24 hours"],
    },
  ],
  presentations: [
    {
      src: "/shop.jpeg",
      type: ServicePresentationType.Img,
    },
    {
      src: "/shop-2.jpeg",
      type: ServicePresentationType.Img,
    },
    {
      src: "/shop-2.jpeg",
      type: ServicePresentationType.Img,
    },
    {
      src: "/shop-2.jpeg",
      type: ServicePresentationType.Img,
    },
  ],
  location: {
    address: "123 Main St",
    city: "Anytown",
    country: "USA",
    lat: 37.7749,
    lon: -122.4194,
    postalCode: 12345,
    state: "CA",
  },
  rooms: [
    {
      cancelationPolicies: [
        {
          id: "policy-1",
          cost: 50,
          duration: 60,
        },
      ],
      presentations: [],
      reviews: 15,
      rating: 4.5,
      createdAt: "2023-03-05T00:00:00Z",
      dailyPrice: true,
      dailyPrices: {
        fr: 90,
        mo: 100,
        sa: 110,
        su: 120,
        th: 95,
        tu: 105,
        we: 100,
      },
      description: "Cozy room with a view",
      discount: {
        units: 3,
        value: 10,
      },
      extras: [
        {
          cost: 20,
          name: "Mini-bar",
        },
        {
          cost: 10,
          name: "Late check-out",
        },
      ],
      hotelId: "67890",
      id: "54321",
      includedAmenities: ["Free Wi-Fi", "Parking"],
      includedServices: ["Room cleaning", "Towels"],
      measurements: {
        inFeet: 15,
        inMeter: 20,
      },
      popularAmenities: [
        {
          label: "Swimming pool",
          value: "yes",
          slug: "swimming-pool",
        },
        {
          label: "Gym",
          value: "yes",
          slug: "gym",
        },
      ],
      pricePerNight: 90,
      title: "Standard Room",
      updatedAt: "2023-03-06T00:00:00Z",
      bathrooms: 2,
      beds: 3,
      num_of_rooms: 2,
      sellerId: "",
      thumbnail: "/shop.jpeg",
    },
  ],
  serviceMetaInfo: {
    description: "A great hotel in a prime location",
    hashtags: ["#travel", "#vacation", "#hotel"],
    metaTagDescription:
      "Book your stay at our hotel and enjoy great amenities and services",
    metaTagKeywords: ["hotel, travel, vacation"],
    title: "Book Your Stay at Our Hotel",
  },
  updatedAt: "2023-03-06T00:00:00Z",
  contact: {
    address: "address",
    city: "city",
    country: "country",
    email: "email",
    phone: "123456789",
    state: "state",
  },
};

export const FAKE_SHOP_DETAILS: GetShopDetailsQuery["getUserShop"] = {
  __typename: "Shop",
  banner: "/shop.jpeg",
  businessType: BusinessType.Company,
  images: ["/shop.jpeg", "/shop.jpeg"],
  videos: ["https://placeholder.com/video1.mp4"],
  createdAt: new Date().toISOString(),
  description: "This is a placeholder description for the shop.",
  email: "shop@example.com",
  id: "shop-123",
  ownerId: "owner-123",
  name: "Placeholder Shop",
  phone: "+1234567890",
  rating: 4.5,
  reviews: 120,
  thumbnail: "/shop.jpeg",
  type: ServiceType.Hotel,
  storeType: StoreType.Service,
  verified: true,
  sellerProfile: {
    __typename: "Profile",
    photo: "/shop.jpeg",
    username: "placeholder_user",
    ownerId: "owner-123",
    id: "profile-123",
  },
  location: {
    __typename: "ServiceLocation",
    address: "123 Placeholder St",
    city: "Placeholder City",
    country: "Placeholder Country",
    lat: 12.34,
    lon: 56.78,
    postalCode: 12345,
    state: "Placeholder State",
    countryCode: "PC",
  },
  workingSchedule: {
    __typename: "WorkingSchedule",
    id: "schedule-123",
    weekdays: {
      fr: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-13:00", "14:00-18:00"],
      },
      mo: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-13:00", "14:00-18:00"],
      },
      sa: {
        __typename: "ServiceDayWorkingHours",
        periods: ["10:00-14:00"],
      },
      su: null,
      th: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-13:00", "14:00-18:00"],
      },
      tu: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-13:00", "14:00-18:00"],
      },
      we: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-13:00", "14:00-18:00"],
      },
    },
  },
};
