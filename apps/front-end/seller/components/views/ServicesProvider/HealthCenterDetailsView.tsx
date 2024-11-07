import React from "react";
import {
  SpinnerFallback,
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  useGetHealthCenterDetailsQuery,
  SellerServiceWorkingHoursSection,
  HealthCenterDoctorsList,
  RestaurantDetailsDescriptionSection,
  ServiceDetailsReviewsSection,
  TabList,
  Tabs,
  TabsHeader,
  TabTitle,
  WorkingDaysCalender,
  ServicesProviderHeader,
  Image,
  LocationOnPointFillIcon,
  Button,
  Divider,
  ServiceReservastionForm,
  GetHealthCenterQuery,
} from "ui";
import { getRandomImage } from "placeholder";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { HealthCenterDoctorAvailablityStatus } from "api";
import {
  ServicePaymentMethod,
  ServicePresentationType,
  ServiceStatus,
} from "@features/API";

const FAKE_HEALTH_CENTER_DATA: GetHealthCenterQuery["getHealthCenter"] = {
  id: "hc123",
  ownerId: "owner789",
  payment_methods: [ServicePaymentMethod.Cash],
  rating: 4.5,
  status: ServiceStatus.Active,
  totalReviews: 120,
  vat: 0.08,
  cancelationPolicies: [
    {
      cost: 50.0,
      duration: 24,
    },
    {
      cost: 100.0,
      duration: 12,
    },
  ],
  contact: {
    address: "456 Health Ave",
    city: "MediCity",
    country: "Healthland",
    email: "contact@healthcenter.com",
    phone: "+9876543210",
    state: "Healthy",
  },
  doctors: [
    {
      availablityStatus: HealthCenterDoctorAvailablityStatus.Available,
      description: "Expert in cardiology with 20 years of experience.",
      healthCenterId: "hc123",
      id: "doc1",
      name: "Dr. Heart",
      price: 200.0,
      rating: 4.8,
      specialityId: "spec1",
      thumbnail: "https://example.com/thumbnails/doctor1.jpg",
      speciality: {
        description: "Cardiology specialty",
        id: "spec1",
        name: "Cardiology",
      },
    },
    {
      availablityStatus: HealthCenterDoctorAvailablityStatus.Unavailable,
      description: "Renowned neurologist with a focus on brain health.",
      healthCenterId: "hc123",
      id: "doc2",
      name: "Dr. Brain",
      price: 250.0,
      rating: 4.7,
      specialityId: "spec2",
      thumbnail: "https://example.com/thumbnails/doctor2.jpg",
      speciality: {
        description: "Neurology specialty",
        id: "spec2",
        name: "Neurology",
      },
    },
  ],
  location: {
    address: "456 Health Ave",
    city: "MediCity",
    country: "Healthland",
    lat: 34.0522,
    lon: -118.2437,
    postalCode: 67890,
    state: "Healthy",
  },
  owner: {
    id: "owner789",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@healthcenter.com",
    photo: "https://example.com/photos/alice.jpg",
    verified: true,
  },
  policies: [
    {
      policyTitle: "No Smoking",
      terms: ["Smoking is prohibited in all areas of the health center."],
    },
    {
      policyTitle: "Masks Required",
      terms: ["All visitors must wear masks inside the health center."],
    },
  ],
  presentations: [
    {
      src: getRandomImage(),
      type: ServicePresentationType.Img,
    },
    {
      src: getRandomImage(),
      type: ServicePresentationType.Img,
    },
  ],
  serviceMetaInfo: {
    description:
      "A state-of-the-art health center offering a wide range of medical services.",
    hashtags: ["#healthcenter", "#medical", "#wellness"],
    metaTagDescription:
      "Discover top-notch healthcare at our state-of-the-art health center.",
    metaTagKeywords: ["health center", "medical services", "wellness"],
    title: "State-of-the-Art Health Center",
  },
  workingSchedule: {
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
  takenSchedule: {
    id: "schedule2",
    weekdays: {
      fr: {
        periods: ["13:00", "17:00"],
      },
      mo: {
        periods: ["13:00", "17:00"],
      },
      sa: {
        periods: ["10:00", "12:00"],
      },
      su: {
        periods: [],
      },
      th: {
        periods: ["13:00", "17:00"],
      },
      tu: {
        periods: ["13:00", "17:00"],
      },
      we: {
        periods: ["13:00", "17:00"],
      },
    },
  },
};

export const HealthCenterDetailsView: React.FC = () => {
  const { getParam } = useRouting();
  const id = getParam("id");
  // WARNING: grqphql is not ready yet once it's ready remove the placeholder
  const {
    data: _res,
    isError: _isError,
    isLoading: _isLoading,
  } = useGetHealthCenterDetailsQuery(id);
  const res = FAKE_HEALTH_CENTER_DATA;

  const { t } = useTranslation();

  const ServicesProviderTabs: { name: string; component: React.ReactNode }[] =
    React.useMemo(
      () => [
        {
          name: "Description",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <div className="flex flex-col gap-8">
                  <RestaurantDetailsDescriptionSection
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
                    title={"Health Center Policies and terms"}
                    policies={res.policies}
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
              {res ? (
                <>
                  <SellerServiceWorkingHoursSection
                    workingDays={
                      (Object.values(res.workingSchedule.weekdays) as any) || []
                    }
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Doctors",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <HealthCenterDoctorsList
                  cancelation={res.cancelationPolicies || []}
                  doctors={res.doctors || []}
                />
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
    <div className="flex flex-col gap-8 px-2 py-8">
      <div className="flex w-full items-center justify-between shadow p-4">
        <div className="flex gap-4">
          <Image
            alt="avetar"
            className="w-28 h-20 rounded-xl object-cover"
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
      <ServicePresentationCarosuel data={res ? res.presentations || [] : []} />
      <SpinnerFallback isLoading={false}>
        {res ? (
          <ServicesProviderHeader
            rating={res.rating}
            reviewsCount={156}
            serviceTitle={res.serviceMetaInfo.title}
          // travelPeriod={{ arrival: new Date(), departure: new Date() }}
          />
        ) : null}
      </SpinnerFallback>
      <StaticSideBarWrapper
        sidebar={
          <ServiceReservastionForm
            sellerId={""}
            selectedServicesIds={[]}
          // serviceId={""}
          />
        }
      >
        <Tabs>
          {({ currentTabIdx }) => {
            return (
              <>
                <TabsHeader />
                <TabList />
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
                {ServicesProviderTabs.at(currentTabIdx).component}
              </>
            );
          }}
        </Tabs>
      </StaticSideBarWrapper>
    </div>
  );
};
