import React from "react";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  Divider,
  ServiceOnMapLocalizationSection,
  ServiceReachOutSection,
  ServiceWorkingHoursSection,
  ServicePoliciesSection,
  ServicesProviderDescriptionSection,
  Reviews,
  SectionTabType,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  SectionsScrollTabList,
  ResturantFindTableFilterStepper,
  Accordion,
  ResturantMenuListSection,
  useGetRestaurantServiceDetailsDataQuery,
  GetRestaurantQuery,
} from "ui";
import { getRandomImage, reviews } from "placeholder";
import { useResponsive } from "hooks";
import { random } from "lodash";
import {
  ServicePaymentMethod,
  ServicePresentationType,
  ServiceStatus,
  ServiceTypeOfSeller,
} from "@features/API";

export const MarketRestaurantDetailsView: React.FC<{ id?: string }> = ({
  id,
}) => {
  const {
    data: _res,
    isError: _isError,
    isLoading: _isLoading,
  } = useGetRestaurantServiceDetailsDataQuery(id!);
  const { isMobile } = useResponsive();
  const res = FAKE_RESTAURNAT_DETAILS;
  const isError = false;
  const isLoading = false;

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? (
          <ServicesProviderHeader
            rating={4}
            reviewsCount={156}
            serviceTitle="Restaurant name"
          />
        ) : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel data={res ? res.presentations || [] : []} />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={
          <div className="w-full h-full mt-4">
            <ResturantFindTableFilterStepper />
          </div>
        }
      >
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          {res ? (
            <ServicesProviderDescriptionSection
              description={res.serviceMetaInfo.description}
            />
          ) : null}
        </SpinnerFallback>
        <Divider />
        <Accordion defaultOpenItems={[...Array(10)].map((_, i) => `${i}`)}>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceReachOutSection
                email={res.contact.email}
                location={res.location}
                telephone={res.contact.phone}
              />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ResturantMenuListSection
                cancelation={res.cancelationPolicies || []}
                menus={res.menus}
              />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceWorkingHoursSection workingHours={res.workingHours} />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServicePoliciesSection policies={res.policies} title="" />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceOnMapLocalizationSection location={res.location} />
            ) : null}
          </SpinnerFallback>
        </Accordion>
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {res ? <Reviews id={res?.id || ""} reviews={reviews} /> : null}
        </SpinnerFallback>
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
    slug: "menu",
    name: "Menu",
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

export const FAKE_RESTAURNAT_DETAILS: GetRestaurantQuery["getRestaurant"] = {
  __typename: "Restaurant",
  cuisinesTypeId: "1",
  establishmentTypeId: "1",
  highest_price: 150,
  id: "restaurant_1",
  lowest_price: 20,
  michelin_guide_stars: 3,
  ownerId: "owner_1",
  payment_methods: [ServicePaymentMethod.Cash, ServicePaymentMethod.Visa],
  setting_and_ambianceId: "ambiance_1",
  status: ServiceStatus.Active,
  vat: 10,
  location: {
    __typename: "ServiceLocation",
    address: "123 Main St",
    city: "Sample City",
    country: "CountryName",
    lat: 40.7128,
    lon: -74.006,
    postalCode: 42353,
    state: "Sample State",
  },
  menus: [
    {
      __typename: "RestaurantMenu",
      id: "menu_1",
      name: "Dinner Specials",
      dishs: [
        {
          __typename: "Dish",
          id: "dish_1",
          ingredients: ["Chicken", "Garlic", "Pepper"],
          price: 25,
          name: "Grilled Chicken",
          thumbnail: "/shop.jpeg",
        },
        {
          __typename: "Dish",
          id: "dish_2",
          ingredients: ["Beef", "Onion", "Salt"],
          price: 30,
          name: "Beef Steak",
          thumbnail: "/shop.jpeg",
        },
      ],
    },
  ],
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
      __typename: "ServicePresentation",
      src: getRandomImage(),
      type: ServicePresentationType.Img,
    },
  ],
  serviceMetaInfo: {
    __typename: "ServiceMetaInfo",
    description: "A fine dining restaurant with exquisite cuisine.",
    hashtags: ["#dining", "#restaurant"],
    metaTagDescription: "Fine dining restaurant",
    title: "Sample Restaurant",
    metaTagKeywords: ["dining", "restaurant", "cuisine"],
  },
  contact: {
    __typename: "ServiceContact",
    address: "123 Main St",
    city: "Sample City",
    country: "CountryName",
    email: "contact@restaurant.com",
    phone: "+123456789",
    state: "Sample State",
  },
  cancelationPolicies: [
    {
      __typename: "ServiceCancelationPolicy",
      id: "policy_1",
      cost: 20,
      duration: 24,
    },
  ],
  owner: {
    __typename: "Account",
    firstName: "John",
    lastName: "Doe",
    id: "owner_1",
    photo: getRandomImage(),
    verified: true,
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
};
