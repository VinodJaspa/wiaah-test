import React from "react";
import {
  Tabs,
  TabList,
  TabTitle,
  TabsHeader,
  useGetServicesProviderQuery,
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  HotelServiceRoomsSection,
  ServicesProviderDescriptionSection,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  ServiceReservastionForm,
  SpinnerFallback,
  ServiceDetailsReviewsSection,
  SellerServiceWorkingHoursSection,
  ServicesProviderHeader,
  Image,
  Button,
  Divider,
  LocationOnPointFillIcon,
  ServiceRangeBookingCalander,
} from "ui";
import { useTranslation } from "react-i18next";
import { getRandomImage } from "placeholder";
import { ServiceAdaptation } from "@features/API";
import { ServicePresentationType } from "api";

const FAKE_HOTEL_DATA = {
  __typename: "ServiceDetails",
  createdAt: "2023-01-01T00:00:00Z",
  cuisinesTypeId: "cuisine123",
  establishmentTypeId: "establishment123",
  highest_price: 100,
  id: "service123",
  lowest_price: 10,
  michelin_guide_stars: 3,
  ownerId: "owner123",
  payment_methods: ["Credit Card", "Paypal"],
  setting_and_ambianceId: "ambiance123",
  type_of_seller: "individual",
  updatedAt: "2023-06-01T00:00:00Z",
  contact: {
    __typename: "ServiceContact",
    address: "123 Main St",
    city: "Anytown",
    country: "USA",
    email: "contact@example.com",
    phone: "+1234567890",
    state: "NY",
  },
  workingHours: {
    id: "schedule123",
    weekdays: {
      fr: {
        periods: ["09:00", "17:00"],
      },
      mo: {
        periods: ["09:00", "17:00"],
      },
      sa: {
        periods: ["10:00", "14:00"],
      },
      su: {
        periods: ["10:00", "14:00"],
      },
      th: {
        periods: ["09:00", "17:00"],
      },
      tu: {
        periods: ["09:00", "17:00"],
      },
      we: {
        periods: ["09:00", "17:00"],
      },
    },
  },
  doctors: [
    {
      __typename: "Doctor",
      availablityStatus: "Available",
      description: "Experienced general physician.",
      healthCenterId: "healthCenter123",
      id: "doctor123",
      name: "Dr. John Doe",
      price: 100,
      rating: 4.8,
      thumbnail: getRandomImage(),
      specialityId: "speciality123",
      speciality: {
        __typename: "HealthCenterSpecialty",
        description: "General Medicine",
        id: "speciality123",
        name: "General Medicine",
      },
    },
  ],
  location: {
    address: "123 Main St",
    city: "Anytown",
    country: "USA",
    lat: 40.7128,
    lon: -74.006,
    postalCode: 12345,
    state: "NY",
  },
  menus: [
    {
      __typename: "RestaurantMenu",
      id: "menu123",
      name: "Main Menu",
      dishs: [
        {
          __typename: "Dish",
          id: "dish123",
          ingredients: ["ingredient1", "ingredient2"],
          name: "Dish Name",
          price: 15,
          thumbnail: getRandomImage(),
        },
      ],
    },
  ],
  policies: [
    {
      __typename: "ServicePolicy",
      policyTitle: "No Smoking",
      terms: "Smoking is prohibited inside the premises.",
    },
  ],
  presentations: [
    {
      src: getRandomImage(),
      type: ServicePresentationType.Img,
    },
  ],
  rooms: {
    bathrooms: 1,
    beds: 2,
    createdAt: "2023-01-01T00:00:00Z",
    dailyPrice: true,
    description: "Spacious room with a beautiful view.",
    hotelId: "hotel123",
    id: "room123",
    includedAmenities: ["WiFi", "Air Conditioning"],
    includedServices: ["Room Service", "Daily Housekeeping"],
    num_of_rooms: 1,
    pricePerNight: 150,
    rating: 4.7,
    updatedAt: "2023-06-01T00:00:00Z",
    title: "Deluxe Room",
    sellerId: "seller123",
    reviews: 5,
    adaptedFor: [ServiceAdaptation.Wheelchair],
    thumbnail: getRandomImage(),
    cancelationPolicies: [
      {
        cost: 20,
        duration: 1,
      },
    ],
    discount: {
      units: 1,
      value: 10,
    },
    dailyPrices: {
      fr: 150,
      mo: 130,
      sa: 160,
      su: 140,
      th: 135,
      tu: 130,
      we: 130,
    },
    extras: [
      {
        cost: 20,
        name: "Extra Bed",
      },
    ],
    measurements: {
      inFeet: 300,
      inMeter: 27.87,
    },
    popularAmenities: [
      {
        label: "Free WiFi",
        value: "",
      },
    ],
    presentations: [
      {
        src: getRandomImage(),
        type: ServicePresentationType.Img,
      },
    ],
  },
  serviceMetaInfo: {
    __typename: "ServiceMetaInfo",
    description: "Luxury hotel offering the best services.",
    hashtags: ["#luxury", "#hotel"],
    metaTagDescription: "Luxury hotel in the heart of the city.",
    metaTagKeywords: ["hotel", "luxury", "service"],
    title: "Luxury Hotel",
  },
  treatments: [
    {
      __typename: "Treatment",
      beautyCenterServiceId: "beautyCenter123",
      duration: "60 mins",
      id: "treatment123",
      price: 100,
      thumbnail: getRandomImage(),
      title: "Full Body Massage",
      treatmentCategoryId: "category123",
      category: {
        __typename: "BeautyCenterTreatmentCategory",
        createdAt: "2022-01-01T00:00:00Z",
        createdById: "creator123",
        id: "category123",
        title: "Massage Therapy",
      },
      discount: {
        __typename: "ServiceDiscount",
        units: "percent",
        value: 15,
      },
    },
  ],
  vehicles: [
    {
      __typename: "Vehicle",
      brand: "Toyota",
      id: "vehicle123",
      model: "Camry",
      price: 100,
      title: "Toyota Camry",
      cancelationPolicies: [
        {
          __typename: "ServiceCancelationPolicy",
          cost: 30,
          duration: "12 hours",
        },
      ],
      presentations: [
        {
          __typename: "ServicePresentation",
          src: getRandomImage(),
          type: "image",
        },
      ],
      properties: {
        __typename: "VehicleProperties",
        airCondition: true,
        gpsAvailable: true,
        lugaggeCapacity: 3,
        maxSpeedInKm: 200,
        seats: 5,
        windows: 4,
      },
    },
  ],
};

export const HotelDetailsView: React.FC = () => {
  //WARNING: grphql query endpoint is not ready yet
  const {
    data: _res,
    isError: _isError,
    isLoading: _isLoading,
  } = useGetServicesProviderQuery("");
  const { t } = useTranslation();
  const res = FAKE_HOTEL_DATA;
  const ServicesProviderTabs: { name: string; component: React.ReactNode }[] =
    React.useMemo(
      () => [
        {
          name: "Description",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <div className="flex flex-col gap-8">
                  <ServicesProviderDescriptionSection
                    description={res.serviceMetaInfo.description}
                  />
                </div>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Contact",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <>
                  <ServiceReachOutSection
                    email={res.contact.email}
                    location={res.location}
                    telephone={res.contact.phone}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Policies",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <>
                  <ServicePoliciesSection
                    title={"Check-in Checout Terms"}
                    // deposit={15}
                    policies={[
                      {
                        policyTitle: "Check-in and Check-out",
                        terms: [
                          "Check-in time is after 3:00 PM",
                          "Check-out time is before 12:00 PM",
                          "Early check-in or late check-out may be available upon request and subject to availability",
                        ],
                      },
                      {
                        policyTitle: "Cancellation",
                        terms: [
                          "Cancellation policy varies depending on the rate plan booked",
                          "Some rate plans may be non-refundable",
                          "Cancellation requests must be made by 6:00 PM local time on the day prior to arrival to avoid cancellation fees",
                        ],
                      },
                      {
                        policyTitle: "Pets",
                        terms: ["Pets are not allowed in the hotel"],
                      },
                    ]}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Working hours",
          component: (
            <SpinnerFallback isLoading={false}>
              {res && res.workingHours ? (
                <>
                  <SellerServiceWorkingHoursSection
                    workingDays={Object.values(res.workingHours.weekdays)}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Rooms",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <>
                  <HotelServiceRoomsSection rooms={[res.rooms]} />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Localization",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <>
                  <ServiceOnMapLocalizationSection location={res.location} />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Customer reviews",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <>
                  <ServiceDetailsReviewsSection
                    overAllRating={5}
                    ratingLevels={[
                      {
                        rate: 4.9,
                        name: "Amenities",
                      },
                      {
                        name: "Communication",
                        rate: 5,
                      },
                      {
                        name: "Value for Money",
                        rate: 5,
                      },
                      {
                        name: "Hygiene",
                        rate: 5,
                      },
                      {
                        name: "Location of Property",
                        rate: 5,
                      },
                    ]}
                    reviews={[...Array(6)].map((_, i) => ({
                      name: "John Doberman",
                      content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      thumbnail: `/profile (${i + 1}).jfif`,
                      date: new Date().toString(),
                    }))}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
      ],
      [res]
    );

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-between shadow p-4">
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
          <Image
            alt="cover"
            className="w-40 h-28 sm:h-20 sm:w-28 rounded-xl object-cover"
            src={
              res
                ? "https://www.murhotels.com/cache/40/b3/40b3566310d686be665d9775f59ca9cd.jpg"
                : ""
            }
          />
          <div className="flex flex-col">
            <p className=" font-bold text-xl">
              {res ? res.serviceMetaInfo.title : null}
            </p>
            <div className="flex text-black gap-1 items-center">
              <LocationOnPointFillIcon />
              {res ? (
                <p>
                  {res.location.city}, {res.location.country}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button>{t("Follow")}</Button>
          <Button outline>{t("Contact")}</Button>
        </div>
      </div>
      <Divider />
      <ServicePresentationCarosuel data={res.presentations} />
      <SpinnerFallback isLoading={false}>
        {res ? (
          <ServicesProviderHeader
            rating={15}
            reviewsCount={150}
            serviceTitle={"service title"}
          // travelPeriod={{ arrival: new Date(), departure: new Date() }}
          />
        ) : null}
      </SpinnerFallback>
      <StaticSideBarWrapper
        sidebar={
          res ? (
            <ServiceRangeBookingCalander
              bookedDates={[]}
              date={new Date()}
              onChange={() => { }}
              value={[]}
            />
          ) : null
        }
      >
        <Tabs>
          {({ currentTabIdx }) => {
            return (
              <>
                <TabsHeader className="flex ">
                  {ServicesProviderTabs.map((tab, i) => (
                    <>
                      <TabTitle TabKey={i}>
                        {({ currentActive }) => (
                          <p
                            className={`${currentActive ? "text-primary" : "text-lightBlack"
                              } font-bold text-sm`}
                          >
                            {t(tab.name)}
                          </p>
                        )}
                      </TabTitle>
                    </>
                  ))}
                </TabsHeader>
                <TabList />
                {ServicesProviderTabs.at(currentTabIdx).component}
              </>
            );
          }}
        </Tabs>
      </StaticSideBarWrapper>
    </div>
  );
};
