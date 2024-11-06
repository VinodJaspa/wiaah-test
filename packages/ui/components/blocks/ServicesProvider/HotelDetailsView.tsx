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
import { reviews } from "placeholder";
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

export const HotelDetailsView: React.FC<{ id: string }> = ({ id }) => {
  const { isMobile } = useResponsive();
  const res = FAKE_SHOP_DETAILS;
  const { data: _data } = useGetServicesProviderQuery(res?.ownerId || "");
  const { data: _res, isError, isLoading } = useGetShopDetailsQuery(id);
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
      src: "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://image-tc.galaxy.tf/wijpeg-5fj3s48cv2nf9rs8mv5amtpab/select-room-one-bedroom-3.jpg?width=1920",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://www.ohotelsindia.com/pune/images/b32d5dc553ee2097368bae13f83e93cf.jpg",
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
        },
        {
          label: "Gym",
          value: "yes",
        },
      ],
      pricePerNight: 90,
      title: "Standard Room",
      updatedAt: "2023-03-06T00:00:00Z",
      bathrooms: 2,
      beds: 3,
      num_of_rooms: 2,
      sellerId: "",
      thumbnail: "",
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
  banner: "https://placeholder.com/banner.jpg",
  businessType: BusinessType.Company,
  images: [
    "https://placeholder.com/image1.jpg",
    "https://placeholder.com/image2.jpg",
  ],
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
  thumbnail: "https://placeholder.com/thumbnail.jpg",
  type: ServiceType.Hotel,
  storeType: StoreType.Service,
  verified: true,
  sellerProfile: {
    __typename: "Profile",
    photo: "https://placeholder.com/photo.jpg",
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
      __typename: "WeekdaysWorkingHours",
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
