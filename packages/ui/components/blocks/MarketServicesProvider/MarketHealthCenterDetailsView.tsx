import React from "react";
import {
  SpinnerFallback,
  Divider,
  ServiceReachOutSection,
  ServicePoliciesSection,
  ServiceWorkingHoursSection,
  ServicesProviderDescriptionSection,
  Reviews,
  SectionTabType,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  SectionsScrollTabList,
  Accordion,
  useGetHealthCenterDetailsQuery,
  ServicesProviderHeader,
  WorkingDaysCalender,
  HealthCenterDoctorsList,
  ServiceOnMapLocalizationSection,
  GetHealthCenterQuery,
} from "ui";
import { reviews } from "placeholder";
import { useResponsive } from "hooks";
import {
  HealthCenterDoctorAvailablityStatus,
  ServicePaymentMethod,
  ServicePresentationType,
  ServiceStatus,
  ServiceWeekdaysWorkingHours,
  WeekdaysWorkingHours,
} from "@features/API";
const convertMapScheduleToDates = (
  schedule: WeekdaysWorkingHours,
  capitalizeWeekdays: boolean = true,
): { date: string; workingHoursRanges: { from: string; to: string }[] }[] => {
  if (!schedule) return [];

  return Object.entries(schedule).map(([key, value]) => {
    const date = capitalizeWeekdays
      ? key.charAt(0).toUpperCase() + key.slice(1) // Capitalize weekday (e.g., "Mo")
      : key;

    if (value && typeof value === "object" && value.periods.length > 0) {
      return {
        date,
        workingHoursRanges: value.periods.map((period: string) => {
          const [from, to] = period.split("-");
          return { from, to };
        }),
      };
    }

    return {
      date,
      workingHoursRanges: [], // Empty for null or undefined values
    };
  });
};

export const MarketHealthCenterDetailsView: React.FC<{ id: string }> = ({
  id,
}) => {
  const {
    data: _res,
    isError: _isError,
    isLoading: _isloading,
  } = useGetHealthCenterDetailsQuery(id);
  const isLoading = false;
  const isError = false;
  const res = FAKE_HEALTH_CENTER_DETAILS;

  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? (
          <ServicesProviderHeader
            serviceTitle={res.serviceMetaInfo.title}
            rating={res.rating}
            reviewsCount={res.totalReviews}
          />
        ) : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel data={res ? res.presentations || [] : []} />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={
          <div className="w-full h-full mt-4 ">
            <WorkingDaysCalender
              takenDates={convertMapScheduleToDates(
                res?.takenSchedule?.weekdays,
              )}
              workingDates={convertMapScheduleToDates(
                res?.workingSchedule?.weekdays,
              )}
            />
          </div>
        }
      >
        {res ? (
          <>
            <Accordion>
              <ServicesProviderDescriptionSection
                description={res.serviceMetaInfo.description}
              />
              <Divider />
              <HealthCenterDoctorsList
                cancelation={res.cancelationPolicies || []}
                doctors={res.doctors || []}
              />
              <ServiceReachOutSection
                email={res.contact.email}
                location={res.location}
                telephone={res.contact.phone}
              />
              <ServiceWorkingHoursSection workingHours={res.workingSchedule!} />
              <ServicePoliciesSection title="" policies={res.policies} />
              <ServiceOnMapLocalizationSection location={res.location} />
            </Accordion>
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
    slug: "doctors",
    name: "Doctors",
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
const FAKE_HEALTH_CENTER_DETAILS: GetHealthCenterQuery["getHealthCenter"] = {
  // createdAt: "2023-03-06T00:00:00Z",
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
  rating: 15,
  status: ServiceStatus.Active,
  totalReviews: 153,
  vat: 12,
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
      src: "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
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

  doctors: [
    {
      availablityStatus: HealthCenterDoctorAvailablityStatus.Available,
      description: "eye doctor description",
      healthCenterId: "",
      id: "",
      name: "doctor name",
      price: 150,
      rating: 5,
      specialityId: "",
      thumbnail:
        "https://cdn.sanity.io/images/0vv8moc6/diag_imaging/299673abf1f3d5e6c1e45cf05eff17274c935008-940x788.png?fit=crop&auto=format",
      speciality: { description: "eyes", id: "", name: "eye" },
    },
    {
      availablityStatus: HealthCenterDoctorAvailablityStatus.Available,
      description: "eye doctor description",
      healthCenterId: "",
      id: "",
      name: "doctor name",
      price: 150,
      rating: 5,
      specialityId: "",
      thumbnail:
        "https://cdn.sanity.io/images/0vv8moc6/diag_imaging/299673abf1f3d5e6c1e45cf05eff17274c935008-940x788.png?fit=crop&auto=format",
      speciality: { description: "eyes", id: "", name: "eye" },
    },
    {
      availablityStatus: HealthCenterDoctorAvailablityStatus.Available,
      description: "eye doctor description",
      healthCenterId: "",
      id: "",
      name: "doctor name",
      price: 150,
      rating: 5,
      specialityId: "",
      thumbnail:
        "https://cdn.sanity.io/images/0vv8moc6/diag_imaging/299673abf1f3d5e6c1e45cf05eff17274c935008-940x788.png?fit=crop&auto=format",
      speciality: { description: "eyes", id: "", name: "eye" },
    },
  ],
  serviceMetaInfo: {
    description: "A great restaurant in a prime location",
    hashtags: ["#travel", "#vacation", "#hotel"],
    metaTagDescription:
      "Book your stay at our hotel and enjoy great amenities and services",
    metaTagKeywords: ["hotel, travel, vacation"],
    title: "Book Your treatment at Our Health center",
  },
  // updatedAt: "2023-03-06T00:00:00Z",
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
    id: "id",
    lastName: "last",
    verified: true,
    photo: "photo",
  },

  takenSchedule: {
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
      sa: null,
      su: null,
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
  workingSchedule: {
    id: "",
    weekdays: {
      fr: {
        __typename: "ServiceDayWorkingHours",
        periods: ["18:00-22:00"],
      },
      mo: {
        __typename: "ServiceDayWorkingHours",
        periods: ["09:00-17:00", "07:00-11:00"],
      },
      sa: null,
      su: null,
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
