import React from "react";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  Divider,
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  useGetBeautyCenterDetailsQuery,
  BeautyCenterTreatmentsList,
  Tabs,
  TabsHeader,
  TabList,
  TabTitle,
  RestaurantDetailsDescriptionSection,
  SellerServiceWorkingHoursSection,
  ServiceDetailsReviewsSection,
  Image,
  LocationOnPointFillIcon,
  Button,
  ServiceReservastionForm,
} from "ui";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { getRandomImage } from "placeholder";
import { ServicePresentationType } from "@features/API";

const FAKE_BEAUTY_CENTER_DATA = {
  beauty_center_typeId: "bct1",
  createdAt: "2023-01-01T00:00:00Z",
  id: "bc123",
  ownerId: "owner456",
  payment_methods: ["credit_card", "cash", "paypal"],
  rating: 4.7,
  status: "active",
  title: "Glamour Beauty Center",
  totalReviews: 230,
  type_of_seller: "individual",
  updatedAt: "2023-06-01T00:00:00Z",
  vat: 0.15,
  cancelationPolicies: [
    {
      cost: 20.0,
      duration: 24,
    },
    {
      cost: 50.0,
      duration: 12,
    },
  ],
  location: {
    address: "123 Beauty St",
    city: "Beautville",
    country: "Beautland",
    lat: 40.7128,
    lon: -74.006,
    postalCode: 12345,
    state: "Beautystate",
  },
  owner: {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    photo: getRandomImage(),
    verified: true,
  },
  policies: [
    {
      policyTitle: "No Pets",
      terms: ["Pets are not allowed inside the beauty center."],
    },
    {
      policyTitle: "Appointment Required",
      terms: ["All visits require a prior appointment."],
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
      "A luxurious beauty center offering a wide range of beauty treatments.",
    hashtags: ["#beauty", "#spa", "#wellness"],
    metaTagDescription:
      "Experience luxury at Glamour Beauty Center with top-notch beauty treatments.",
    metaTagKeywords: ["beauty center", "spa", "wellness", "beauty treatments"],
    title: "Glamour Beauty Center",
  },
  treatments: [
    {
      duration: [60],
      id: "treatment1",
      price: 100.0,
      title: "Relaxing Massage",
      treatmentCategoryId: "cat1",
      beautyCenterServiceId: "bcs1",
      thumbnail: getRandomImage(),
      category: {
        createdAt: "2022-01-01T00:00:00Z",
        createdById: "admin1",
        id: "cat1",
        title: "Massage",
        updatedAt: "2022-12-01T00:00:00Z",
      },
      discount: {
        units: 4,
        value: 10,
      },
    },
    {
      duration: [30],
      id: "treatment2",
      price: 50.0,
      title: "Facial Treatment",
      treatmentCategoryId: "cat2",
      beautyCenterServiceId: "bcs2",
      thumbnail: getRandomImage(),
      category: {
        createdAt: "2022-02-01T00:00:00Z",
        createdById: "admin2",
        id: "cat2",
        title: "Facial",
        updatedAt: "2022-11-01T00:00:00Z",
      },
      discount: {
        units: 4,
        value: 15,
      },
    },
  ],
  contact: {
    address: "123 Beauty St",
    city: "Beautville",
    country: "Beautland",
    email: "contact@beautycenter.com",
    phone: "+1234567890",
    state: "Beautystate",
  },
  workingHours: {
    id: "wh1",
    weekdays: {
      fr: {
        periods: ["09:00", "18:00"],
      },
      mo: {
        periods: ["09:00", "18:00"],
      },
      sa: {
        periods: ["10:00", "16:00"],
      },
      su: {
        periods: [],
      },
      th: {
        periods: ["09:00", "18:00"],
      },
      tu: {
        periods: ["09:00", "18:00"],
      },
      we: {
        periods: ["09:00", "18:00"],
      },
    },
  },
  takenHours: {
    id: "th1",
    weekdays: {
      fr: {
        periods: ["13:00", "14:00"],
      },
      mo: {
        periods: ["13:00", "14:00"],
      },
      sa: {
        periods: ["11:00", "12:00"],
      },
      su: {
        periods: [],
      },
      th: {
        periods: ["13:00", "14:00"],
      },
      tu: {
        periods: ["13:00", "14:00"],
      },
      we: {
        periods: ["13:00", "14:00"],
      },
    },
  },
};

export const BeautyCenterServiceDetailsView: React.FC = () => {
  const { getParam } = useRouting();
  const id = getParam("id");
  //WARNING: grqphql endpoint query is not ready
  const {
    data: _res,
    isError: _isError,
    isLoading: _isLoading,
  } = useGetBeautyCenterDetailsQuery(id);
  const res = FAKE_BEAUTY_CENTER_DATA;
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
                    title={"Beauty center Policies and terms"}
                    // deposit={15}
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
                    workingDays={Object.values(res.workingHours.weekdays) || []}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Treatments",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <BeautyCenterTreatmentsList
                  cancelation={res.cancelationPolicies || []}
                  treatments={res.treatments || []}
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
      [res]
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
      <ServicePresentationCarosuel data={res.presentations} />
      <SpinnerFallback isLoading={false}>
        {res ? (
          <ServicesProviderHeader
            rating={res.rating}
            reviewsCount={res.totalReviews}
            serviceTitle={res.serviceMetaInfo.title}
          // travelPeriod={{ arrival: new Date(), departure: new Date() }}
          />
        ) : null}
      </SpinnerFallback>
      <StaticSideBarWrapper
        sidebar={
          <ServiceReservastionForm
            sellerId={"test"}
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
