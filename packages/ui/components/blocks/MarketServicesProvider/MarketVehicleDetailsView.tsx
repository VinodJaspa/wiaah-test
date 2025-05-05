import React from "react";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  useSearchFilters,
  Divider,
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  ServiceWorkingHoursSection,
  ServicesProviderDescriptionSection,
  Reviews,
  SectionTabType,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  SectionsScrollTabList,
  useGetVehicleProviderDetailsQuery,
  DateAndTimeInput,
  VehiclesSelectableList,
  GetVehicleQuery,
} from "ui";
import { random } from "lodash";
import { reviews } from "placeholder";
import { usePublishRef } from "state";
import { useTranslation } from "react-i18next";
import { ServicePaymentMethod, ServicePresentationType } from "@features/API";
import { WorkingSchedule } from "api";

export const MarketVehicleServiceDetailsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const {
    data: _res,
    isError: _isError,
    isLoading: _isLoading,
  } = useGetVehicleProviderDetailsQuery(filters);
  const res = FAKE_VEHICLE_DETAILS;
  const isError = false;
  const isLoading = false;

const { t } = useTranslation();

  const VehiclesRef = usePublishRef("vehicles");

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
          <div className="flex flex-col gap-2 text-xl mt-4">
            <DateAndTimeInput
              onDateChange={() => { }}
              dateLabel={t("Pick-up Date")}
            />
            <DateAndTimeInput
              onDateChange={() => { }}
              dateLabel={t("Return Date")}
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
            <ServiceReachOutSection
              email={res.contact.email}
              location={res.location}
              telephone={res.contact.phone}
            />
            <VehiclesSelectableList vehicles={res.vehicles || []} />
            <ServiceWorkingHoursSection workingHours={res.workingHours} />
            <ServicePoliciesSection
              title={t("Vehicle Policies")}
              policies={res.policies}
            />
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
    slug: "vehicles",
    name: "Vehicles",
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

const FAKE_VEHICLE_DETAILS: GetVehicleQuery["getVehicleServicebyId"] = {
  cancelationPolicies: [
    {
      cost: 20,
      duration: 24,
    },
  ],
  createdAt: "2022-01-01T00:00:00Z",
  id: "123",
  location: {
    address: "123 Main St",
    city: "New York",
    country: "USA",
    lat: 40.712776,
    lon: -74.005974,
    postalCode: 10001,
    state: "NY",
  },
  ownerId: "456",
  payment_methods: [ServicePaymentMethod.Cash, ServicePaymentMethod.CreditCard],
  contact: {
    address: "address",
    city: "city",
    country: "country",
    email: "email",
    phone: "1345",
    state: "state",
  },
  policies: [
    {
      __typename: "ServicePolicy",
      policyTitle: "Cancellation Policy",
      terms: ["Cancel 24 hours in advance for a full refund."],
    },

    {
      __typename: "ServicePolicy",
      policyTitle: "Cancellation Policy",
      terms: ["Cancel 24 hours in advance for a full refund."],
    },

    {
      __typename: "ServicePolicy",
      policyTitle: "Cancellation Policy",
      terms: ["Cancel 24 hours in advance for a full refund."],
    },
    {
      __typename: "ServicePolicy",
      policyTitle: "Cancellation Policy",
      terms: ["Cancel 24 hours in advance for a full refund."],
    },
  ],
  presentations: [
    {
      src: "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://www.autocar.co.uk/sites/autocar.co.uk/files/range-rover-2022-001-tracking-front.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg",
      type: ServicePresentationType.Img,
    },
  ],
  rating: 4.5,
  serviceMetaInfo: {
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    hashtags: ["car rental", "rent a car"],
    metaTagDescription: "Rent a car for your next trip",
    metaTagKeywords: ["car rental", " rent a car", "car hire"],
    title: "Rent a Car",
  },
  workingHours: {
    id: "schedule_1",
    weekdays: {
      fr: {
        periods: ["09:00-17:00"],
      },
      mo: {
        periods: ["09:00-17:00"],
      },
      sa: {
        periods: ["09:00-17:00"],
      },
      su: {
        periods: ["09:00-17:00"],
      },
      th: {
        periods: ["09:00-17:00"],
      },
      tu: {
        periods: ["09:00-17:00"],
      },
      we: {
        periods: ["09:00-17:00"],
      },
    },
  },
  totalReviews: 100,
  updatedAt: "2022-01-02T00:00:00Z",
  vat: 10,
  vehicles: [
    {
      brand: "Toyota",
      cancelationPolicies: [
        {
          id: "policy_1",
          cost: 10,
          duration: 12,
        },
      ],
      id: "789",
      model: "Corolla",
      presentations: [
        {
          src: "https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura-101-1655218102.jpg?crop=1.00xw:0.847xh;0,0.153xh&resize=1200:*",
          type: ServicePresentationType.Img,
        },
        {
          src: "https://imgd.aeplcdn.com/0x0/n/cw/ec/106785/exterior-right-front-three-quarter-2.jpeg?isig=0",
          type: ServicePresentationType.Img,
        },
      ],
      price: 50,
      properties: {
        airCondition: true,
        gpsAvailable: true,
        lugaggeCapacity: 2,
        maxSpeedInKm: 120,
        seats: 5,
        windows: 4,
      },
      title: "Toyota Corolla",
    },
    {
      brand: "Honda",
      cancelationPolicies: [
        {
          id: "policy_2",
          cost: 15,
          duration: 18,
        },
      ],
      id: "ABC",
      model: "Accord",
      presentations: [
        {
          src: "https://www.usnews.com/object/image/00000184-2f95-db4d-a387-afdf94b80000/2020-chevrolet-camaross-001-1.jpg?update-time=1667566268348&size=responsive640",
          type: ServicePresentationType.Img,
        },
      ],
      price: 60,
      properties: {
        airCondition: true,
        gpsAvailable: true,
        lugaggeCapacity: 3,
        maxSpeedInKm: 140,
        seats: 5,
        windows: 4,
      },
      title: "Honda Accord",
    },
    {
      brand: "Toyota",
      cancelationPolicies: [
        {
          id: "policy_3",
          cost: 10,
          duration: 12,
        },
      ],
      id: "789",
      model: "Corolla",
      presentations: [
        {
          src: "https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura-101-1655218102.jpg?crop=1.00xw:0.847xh;0,0.153xh&resize=1200:*",
          type: ServicePresentationType.Img,
        },
        {
          src: "https://imgd.aeplcdn.com/0x0/n/cw/ec/106785/exterior-right-front-three-quarter-2.jpeg?isig=0",
          type: ServicePresentationType.Img,
        },
      ],
      price: 50,
      properties: {
        airCondition: true,
        gpsAvailable: true,
        lugaggeCapacity: 2,
        maxSpeedInKm: 120,
        seats: 5,
        windows: 4,
      },
      title: "Toyota Corolla",
    },
  ],
  owner: {
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    id: "",
    verified: true,
    photo: "",
  },
};
