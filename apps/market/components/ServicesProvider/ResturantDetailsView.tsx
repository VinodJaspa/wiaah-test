import React from "react";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  useSearchFilters,
  Divider,
  ServiceOnMapLocationSection,
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
  useGetResturantServiceDetaislDataQuery,
  HStack,
  PriceDisplay,
} from "ui";
import { reviews } from "placeholder";
import { useTranslation } from "react-i18next";
import { useGetUserInput } from "state";
import { useResponsive } from "hooks";

export const ResturantDetailsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetResturantServiceDetaislDataQuery(filters);
  const { isMobile } = useResponsive();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.presintations || [] : []}
      />
      <SectionsScrollTabList visible={!isMobile} tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper sidebar={ResturantFindTableFilterStepper}>
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          {res ? (
            <ServicesProviderDescriptionSection
              description={res.data.description}
              name={res.data.name}
              proprtyType={res.data.proprtyType}
            />
          ) : null}
        </SpinnerFallback>
        <Divider />
        <Accordion defaultOpenItems={[...Array(10)].map((_, i) => `${i}`)}>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceReachOutSection
                email={res.data.email}
                location={res.data.location}
                telephone={res.data.telephone}
              />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ResturantMenuListSection
                cancelation={res.data.cancelationPolicies || []}
                menus={res.data.menus}
              />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceWorkingHoursSection workingDays={res.data.workingDays} />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServicePoliciesSection policies={res.data.policies} />
            ) : null}
          </SpinnerFallback>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {res ? (
              <ServiceOnMapLocationSection location={res.data.location} />
            ) : null}
          </SpinnerFallback>
        </Accordion>
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {res ? <Reviews id={res?.data.id || ""} reviews={reviews} /> : null}
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
