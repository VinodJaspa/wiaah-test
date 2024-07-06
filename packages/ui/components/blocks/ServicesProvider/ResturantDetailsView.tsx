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
} from "ui";
import { reviews } from "placeholder";
import { useResponsive } from "hooks";

export const RestaurantDetailsView: React.FC<{ id?: string }> = ({ id }) => {
  const {
    data: res,
    isError,
    isLoading,
  } = useGetRestaurantServiceDetailsDataQuery(id!);
  const { isMobile } = useResponsive();

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
      <StaticSideBarWrapper sidebar={<ResturantFindTableFilterStepper />}>
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
              <ServiceWorkingHoursSection
                workingHours={{
                  id: "",
                  weekdays: {
                    fr: {
                      periods: [
                        new Date().toUTCString(),
                        new Date().toUTCString(),
                      ],
                    },
                    mo: {
                      periods: [
                        new Date().toUTCString(),
                        new Date().toUTCString(),
                      ],
                    },
                    sa: {
                      periods: [
                        new Date().toUTCString(),
                        new Date().toUTCString(),
                      ],
                    },
                    su: {
                      periods: [
                        new Date().toUTCString(),
                        new Date().toUTCString(),
                      ],
                    },
                    th: {
                      periods: [
                        new Date().toUTCString(),
                        new Date().toUTCString(),
                      ],
                    },
                    tu: {
                      periods: [
                        new Date().toUTCString(),
                        new Date().toUTCString(),
                      ],
                    },
                    we: {
                      periods: [
                        new Date().toUTCString(),
                        new Date().toUTCString(),
                      ],
                    },
                  },
                }}
              />
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
