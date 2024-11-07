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
  GetServiceDetailsQuery,
  SpinnerFallback,
  ServiceDetailsReviewsSection,
  SellerServiceWorkingHoursSection,
  ServicesProviderHeader,
  Image,
  Button,
  Divider,
  LocationOnPointFillIcon,
  ServiceRangeBookingCalander,
  HotelRoomDetailsCardProps,
} from "ui";
import { useTranslation } from "react-i18next";
import { getRandomImage } from "placeholder";
import { HealthCenterDoctorAvailablityStatus, WeekdaysWorkingHours } from "api";
import { ServicePresentationType, ServiceTypeOfSeller } from "@features/API";

export const HotelDetailsView: React.FC = () => {
  //WARNING: grphql query endpoint is not ready yet
  const {
    data: _res,
    isError: _isError,
    isLoading: _isLoading,
  } = useGetServicesProviderQuery("");
  const { t } = useTranslation();
  const res = FAKE_DATA;

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
                    workingDays={res.workingHours.weekdays}
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
                  <HotelServiceRoomsSection rooms={res ? res.rooms : []} />
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
      [res],
    );

  return (
    <div className="flex flex-col gap-8 px-2 py-8 w-11/12">
      {/*
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
*/}
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

const FAKE_DATA: GetServiceDetailsQuery["getServiceDetails"] = {
  workingHours: {
    id: "schedule1",
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
