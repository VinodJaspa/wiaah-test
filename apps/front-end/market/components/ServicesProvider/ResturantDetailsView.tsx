import React from "react";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  useSearchFilters,
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
} from "ui";
import { reviews } from "placeholder";
import { useResponsive } from "hooks";

export const RestaurantDetailsView: React.FC<{ id: string }> = ({ id }) => {
  const {
    data: res,
    isError,
    isLoading,
  } = useGetRestaurantServiceDetailsDataQuery(id);
  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.getRestaurant.presentations || [] : []}
      />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper sidebar={ResturantFindTableFilterStepper}>
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          {res ? (
            <ServicesProviderDescriptionSection
              description={res.data.getRestaurant.serviceMetaInfo.description}
            />
          ) : null}
        </SpinnerFallback>
        <Divider />
        <Accordion defaultOpenItems={[...Array(10)].map((_, i) => `${i}`)}>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceReachOutSection
                email={res.data.getRestaurant.contact.email}
                location={res.data.getRestaurant.location}
                telephone={res.data.getRestaurant.contact.phone}
              />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ResturantMenuListSection
                cancelation={res.data.getRestaurant.cancelationPolicies || []}
                menus={res.data.getRestaurant.menus}
              />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceWorkingHoursSection
                workingHours={res.data.getRestaurant.workingHours}
              />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServicePoliciesSection
                policies={res.data.getRestaurant.policies}
                title=""
              />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceOnMapLocalizationSection
                location={res.data.getRestaurant.location}
              />
            ) : null}
          </SpinnerFallback>
        </Accordion>
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {res ? (
            <Reviews id={res?.data.getRestaurant.id || ""} reviews={reviews} />
          ) : null}
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
