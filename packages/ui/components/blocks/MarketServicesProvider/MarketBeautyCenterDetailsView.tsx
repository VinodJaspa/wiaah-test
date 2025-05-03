import React from "react";
import { reviews } from "placeholder";
import { useTranslation } from "react-i18next";
import { SpinnerFallback } from "@blocks/FallbackDisplays";
import { Divider } from "@partials";
import { SectionsScrollTabList, SectionTabType } from "../../blocks/Navigating";
import { StaticSideBarWrapper } from "@blocks/Wrappers";
import { WorkingDaysCalender } from "@blocks/DataDisplay";
import {
  useGetBeautyCenterDetailsQuery,
  ServicesProviderHeader,
  ServicePresentationCarosuel,
  ServicesProviderDescriptionSection,
  BeautyCenterTreatmentsList,
  ServiceReachOutSection,
  ServiceWorkingHoursSection,
  ServicePoliciesSection,
  ServiceOnMapLocalizationSection,
  GetBeautyQuery,
} from "@features";
import { Reviews } from "@blocks/Reviews";
import {
  ServicePaymentMethod,
  ServicePresentationType,
  ServiceStatus,
  ServiceTypeOfSeller,
} from "@features/API";

export const MarketBeautyCenterServiceDetailsView: React.FC<{ id: string }> = ({
  id,
}) => {
  const {
    data: _res,
    isError,
    isLoading: _isLoading,
  } = useGetBeautyCenterDetailsQuery(id);
  const res = FAKE_BEAUTY_CENTER_DETAILS;
  const isLoading = false;

const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? (
          <ServicesProviderHeader
            rating={res.rating}
            reviewsCount={res.totalReviews}
            serviceTitle={res.serviceMetaInfo.title}
          />
        ) : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel data={res ? res.presentations || [] : []} />
      <SectionsScrollTabList tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={
          <div className="w-full h-full mt-4 ">
            <WorkingDaysCalender
              takenDates={
                res
                  ? Object.values(res.takenHours.weekdays).map((value) => ({
                    date: new Date().toString(),
                    workingHoursRanges:
                      typeof value === "object"
                        ? [{ from: value!.periods[0], to: value!.periods[1] }]
                        : [],
                  }))
                  : []
              }
              workingDates={
                res
                  ? Object.values(res.workingHours!.weekdays).map((value) => ({
                    date: new Date().toString(),
                    workingHoursRanges:
                      typeof value === "object"
                        ? [{ from: value!.periods[0], to: value!.periods[1] }]
                        : [],
                  }))
                  : []
              }
            />
          </div>
        }
      >
        {res ? (
          <>
            <ServicesProviderDescriptionSection
              description={res.serviceMetaInfo.description}
            />
            <Divider />
            <BeautyCenterTreatmentsList
              cancelation={
                res.cancelationPolicies
                  ? res.cancelationPolicies.map((policy, index) => ({
                      ...policy,
                      id: `default-id-${index}`,
                    }))
                  : []
              }
              treatments={res.treatments}
            />
            <ServiceReachOutSection
              email={res.contact.email}
              location={res.location}
              telephone={res.contact.phone}
            />

            <ServiceWorkingHoursSection workingHours={res.workingHours!} />
            <ServicePoliciesSection policies={res.policies} title="" />
            <ServiceOnMapLocalizationSection location={res.location} />
          </>
        ) : null}
        <Reviews id={res?.id || ""} reviews={reviews} />
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
    name: "Treatments",
    slug: "treatments",
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
const FAKE_BEAUTY_CENTER_DETAILS: GetBeautyQuery["getBeautyCenterById"] = {
  createdAt: "2023-03-06T00:00:00Z",
  id: "12345",
  ownerId: "67890",
  policies: [
    {
      policyTitle: "Cancellation Policy",
      terms: ["Full refund if canceled within 24 hours"],
    },
  ],
  presentations: [
    {
      src: "https://mostaql.hsoubcdn.com/uploads/thumbnails/835649/5fb1c7c34bc0a/Beauty-Centre-1.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://mostaql.hsoubcdn.com/uploads/thumbnails/835649/5fb1c7c34bc0a/Beauty-Centre-1.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://mostaql.hsoubcdn.com/uploads/thumbnails/835649/5fb1c7c34bc0a/Beauty-Centre-1.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://mostaql.hsoubcdn.com/uploads/thumbnails/835649/5fb1c7c34bc0a/Beauty-Centre-1.jpg",
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
  beauty_center_typeId: "",
  cancelationPolicies: [
    {
      cost: 5,
      duration: 4,
    },
    {
      cost: 0,
      duration: 2,
    },
    {
      cost: 10,
      duration: 6,
    },
  ],
  payment_methods: [ServicePaymentMethod.Cash, ServicePaymentMethod.CreditCard],
  rating: 4,
  status: ServiceStatus.Active,
  title: "title",
  totalReviews: 156,
  treatments: [
    {
      discount: {
        units: 15,
        value: 10,
      },
      duration: [30, 60],
      id: "",
      price: 160,
      beautyCenterServiceId: "test",
      thumbnail:
        "https://www.lifeclass.net/media/1248/beauty-center-face-massage-woman.jpg",
      title: "back pain treatment",
      treatmentCategoryId: "",
      category: {
        title: "body treatment",
        createdAt: new Date().toString(),
        createdById: "",
        id: "",
        updatedAt: new Date().toString(),
      },
    },
    {
      beautyCenterServiceId: "test",
      thumbnail:
        "https://www.lifeclass.net/media/1248/beauty-center-face-massage-woman.jpg",
      discount: {
        units: 15,
        value: 10,
      },
      duration: [30, 60],
      id: "",
      price: 160,
      title: "back pain treatment",
      treatmentCategoryId: "",
      category: {
        title: "body treatment",
        createdAt: new Date().toString(),
        createdById: "",
        id: "",
        updatedAt: new Date().toString(),
      },
    },
    {
      beautyCenterServiceId: "test",
      thumbnail:
        "https://www.lifeclass.net/media/1248/beauty-center-face-massage-woman.jpg",
      discount: {
        units: 15,
        value: 10,
      },
      duration: [30, 60],
      id: "",
      price: 160,
      title: "back pain treatment",
      treatmentCategoryId: "",
      category: {
        title: "body treatment",
        createdAt: new Date().toString(),
        createdById: "",
        id: "",
        updatedAt: new Date().toString(),
      },
    },
  ],
  type_of_seller: ServiceTypeOfSeller.Individual,
  vat: 10,
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
    phone: "1345",
    state: "state",
  },
  owner: {
    email: "email",
    firstName: "first",
    // id: "id",
    lastName: "last",
    verified: true,
    photo: "photo",
  },
  takenHours: {
    id: "",
    weekdays: {
      fr: {
        __typename: "ServiceDayWorkingHours",
        periods: ["18:00-22:00"],
      },
      mo: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-17:00"],
      },
      sa: {
        __typename: "ServiceDayWorkingHours",
        periods: ["11:00-23:00"],
      },
      su: {
        __typename: "ServiceDayWorkingHours",
        periods: ["10:00-20:00"],
      },
      th: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-17:00"],
      },
      tu: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-17:00"],
      },
      we: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-17:00"],
      },
    },
  },
  workingHours: {
    id: "",
    weekdays: {
      fr: {
        __typename: "ServiceDayWorkingHours",
        periods: ["18:00-22:00"],
      },
      mo: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-17:00"],
      },
      sa: {
        __typename: "ServiceDayWorkingHours",
        periods: ["10:00-23:00"],
      },
      su: {
        __typename: "ServiceDayWorkingHours",
        periods: ["10:00-20:00"],
      },
      th: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-17:00"],
      },
      tu: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-17:00"],
      },
      we: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-17:00"],
      },
    },
  },
};
