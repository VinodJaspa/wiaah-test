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
  GetServiceDetailsQuery,
} from "ui";
import { getRandomImage, reviews } from "placeholder";
import { useResponsive } from "hooks";
import { useTranslation } from "react-i18next";
import {
  BusinessType,
  PresentationType,
  ServicePresentationType,
} from "../../features/API";
import {
  ServiceType,
  ServiceTypeOfSeller,
  StoreType,
} from "@features/API/gql/generated";
import { getRandomName } from "@UI/../utils/src";

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
  const {
    data: _res,
    isError,
    isLoading: _isLoading,
  } = useGetShopDetailsQuery(id);
  const res = FAKE_SHOP_DETAILS;
  const { data: _data } = useGetServicesProviderQuery(res?.ownerId || "");
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

const FAKE_SHOP_DETAILS = {
  storeType: StoreType.Service,
  type: ServiceType.BeautyCenter,
  ownerId: "",
  banner: "",
  businessType: BusinessType.Individual,
  createdAt: new Date().toUTCString(),
  description:
    "Welcome to our stunning hotel room, where luxury and natural beauty blend seamlessly together. As you step into the room, you're immediately struck by the breathtaking sunset views visible through the floor-to-ceiling windows.",
  email: "test@email.com",
  id: "testid",
  images: [...Array(10)].map(() => getRandomImage()),
  sellerProfile: {
    id: "",
    ownerId: "",
    photo: getRandomImage(),
    username: getRandomName().firstName,
  },
  location: {
    address: "Burj Al Arab Jumeirah Jumeira Road Umm Suqeim 3",
    city: "Dubai",
    country: "United Arab Emirates",
    lat: 45.464664,
    lon: 9.18854,
    postalCode: 1546,
    state: "state",
    countryCode: "AED",
  },
  name: "service name",
  phone: "1324658",
  rating: 5,
  reviews: 160,
  thumbnail: getRandomImage(),
  verified: true,
  videos: [],
  workingSchedule: {
    id: "",
    weekdays: {
      mo: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      tu: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      we: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      th: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      fr: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      sa: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      su: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
    },
  },
};
